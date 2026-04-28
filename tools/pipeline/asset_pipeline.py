#!/usr/bin/env python3
"""Dry-run asset pipeline validation for Color Atlas.

This script intentionally uses only the Python standard library. Future phases
can add Pillow/reportlab/img2pdf processing after the manifest rules are stable.
"""

from __future__ import annotations

import argparse
import json
import re
import sys
from dataclasses import dataclass
from pathlib import Path
from typing import Any


ROOT = Path(__file__).resolve().parents[2]
DEFAULT_CATALOG = ROOT / "src" / "data" / "catalog.json"

SLUG_RE = re.compile(r"^[a-z0-9]+(?:-[a-z0-9]+)*$")
SAFE_PUBLIC_PATH_RE = re.compile(r"^/[a-z0-9][a-z0-9/_-]*\.[a-z0-9]+$")

BLOCKED_TERMS = {
    "disney",
    "elsa",
    "minecraft",
    "mario",
    "pokemon",
    "pokémon",
    "spongebob",
    "peppa pig",
    "paw patrol",
    "harry potter",
    "marvel",
    "pixar",
    "nintendo",
}


@dataclass(frozen=True)
class ValidationIssue:
    level: str
    message: str


class ManifestValidator:
    def __init__(self, catalog: dict[str, Any]) -> None:
        self.catalog = catalog
        self.issues: list[ValidationIssue] = []
        self.content_types = self._by_id("contentTypes")
        self.hubs = self._by_id("hubs")
        self.topics = self._by_id("topics")
        self.printables = self._by_id("printables")

    def validate(self) -> list[ValidationIssue]:
        self._validate_site()
        self._validate_collection("contentTypes", parent_key=None)
        self._validate_collection("hubs", parent_key="contentTypeId")
        self._validate_collection("topics", parent_key="contentTypeId")
        self._validate_collection("printables", parent_key="topicId")
        self._validate_relationships()
        self._validate_printables()
        self._validate_blocked_terms()
        return self.issues

    def planned_outputs(self) -> list[str]:
        lines: list[str] = []
        for printable in sorted(
            self.catalog.get("printables", []),
            key=lambda item: (item.get("topicId", ""), item.get("order", 0), item.get("title", "")),
        ):
            printable_id = printable.get("id", "unknown-printable")
            lines.append(f"- {printable_id}")
            lines.append(f"  source: assets-source/{printable_id}/source.png")
            lines.append(f"  preview: public{printable.get('previewImage', '')}")
            lines.append(f"  pdf: public{printable.get('downloadPdf', '')}")
        return lines

    def _by_id(self, key: str) -> dict[str, dict[str, Any]]:
        records = self.catalog.get(key, [])
        by_id: dict[str, dict[str, Any]] = {}
        for record in records:
            record_id = record.get("id")
            if not isinstance(record_id, str):
                self._error(f"{key} record is missing string id")
                continue
            if record_id in by_id:
                self._error(f"{key} contains duplicate id '{record_id}'")
            by_id[record_id] = record
        return by_id

    def _validate_site(self) -> None:
        site = self.catalog.get("site", {})
        if site.get("locale") != "en":
            self._error("site.locale must be 'en' for launch")
        if site.get("basePath") != "/en":
            self._error("site.basePath must be '/en'")

    def _validate_collection(self, key: str, parent_key: str | None) -> None:
        records = self.catalog.get(key, [])
        if not isinstance(records, list):
            self._error(f"{key} must be a list")
            return

        for record in records:
            label = f"{key}:{record.get('id', 'unknown')}"
            self._require_string(record, "id", label)
            self._require_string(record, "slug", label)
            self._require_string(record, "title", label)
            self._require_string(record, "description", label)

            slug = record.get("slug")
            if isinstance(slug, str) and not SLUG_RE.match(slug):
                self._error(f"{label} has unsafe slug '{slug}'")

            record_id = record.get("id")
            if isinstance(record_id, str) and not SLUG_RE.match(record_id):
                self._error(f"{label} has unsafe id '{record_id}'")

            if parent_key is not None:
                self._require_string(record, parent_key, label)

    def _validate_relationships(self) -> None:
        content_type_ids = set(self.content_types)

        for hub in self.hubs.values():
            if hub.get("contentTypeId") not in content_type_ids:
                self._error(f"hub '{hub.get('id')}' references missing content type")

        for topic in self.topics.values():
            if topic.get("contentTypeId") not in content_type_ids:
                self._error(f"topic '{topic.get('id')}' references missing content type")

            hub_id = topic.get("hubId")
            if hub_id and hub_id not in self.hubs:
                self._error(f"topic '{topic.get('id')}' references missing hub '{hub_id}'")

            if hub_id and hub_id in self.hubs:
                hub = self.hubs[hub_id]
                if hub.get("contentTypeId") != topic.get("contentTypeId"):
                    self._error(f"topic '{topic.get('id')}' hub belongs to a different content type")

            for related_id in topic.get("relatedTopicIds", []):
                if related_id not in self.topics:
                    self._error(f"topic '{topic.get('id')}' references missing related topic '{related_id}'")

        for printable in self.printables.values():
            topic_id = printable.get("topicId")
            if topic_id not in self.topics:
                self._error(f"printable '{printable.get('id')}' references missing topic '{topic_id}'")

            canonical_topic_id = printable.get("canonicalTopicId")
            if canonical_topic_id not in self.topics:
                self._error(
                    f"printable '{printable.get('id')}' references missing canonical topic "
                    f"'{canonical_topic_id}'"
                )
            if topic_id != canonical_topic_id:
                self._warn(
                    f"printable '{printable.get('id')}' canonicalizes to a different topic; "
                    "check that this is intentional"
                )

    def _validate_printables(self) -> None:
        for printable in self.printables.values():
            label = f"printable:{printable.get('id')}"
            preview = printable.get("previewImage")
            pdf = printable.get("downloadPdf")

            if not isinstance(preview, str) or not preview.startswith("/assets/previews/"):
                self._error(f"{label} previewImage must start with /assets/previews/")
            elif not preview.endswith(".webp"):
                self._error(f"{label} previewImage must end with .webp")
            elif not SAFE_PUBLIC_PATH_RE.match(preview):
                self._error(f"{label} previewImage has unsafe characters: {preview}")

            if not isinstance(pdf, str) or not pdf.startswith("/downloads/"):
                self._error(f"{label} downloadPdf must start with /downloads/")
            elif not pdf.endswith(".pdf"):
                self._error(f"{label} downloadPdf must end with .pdf")
            elif not SAFE_PUBLIC_PATH_RE.match(pdf):
                self._error(f"{label} downloadPdf has unsafe characters: {pdf}")

            if printable.get("indexing") != "noindex":
                self._warn(f"{label} is not noindex; individual pages should stay noindex by default")

            for path in (preview, pdf):
                if isinstance(path, str):
                    filename_stem = Path(path).stem
                    if not SLUG_RE.match(filename_stem):
                        self._error(f"{label} has unsafe filename stem '{filename_stem}'")

    def _validate_blocked_terms(self) -> None:
        searchable = json.dumps(self.catalog, ensure_ascii=False).lower()
        for term in sorted(BLOCKED_TERMS):
            if term in searchable:
                self._error(f"blocked franchise/trademark term found: '{term}'")

    def _require_string(self, record: dict[str, Any], key: str, label: str) -> None:
        value = record.get(key)
        if not isinstance(value, str) or not value.strip():
            self._error(f"{label} is missing non-empty string field '{key}'")

    def _error(self, message: str) -> None:
        self.issues.append(ValidationIssue("error", message))

    def _warn(self, message: str) -> None:
        self.issues.append(ValidationIssue("warning", message))


def load_catalog(path: Path) -> dict[str, Any]:
    with path.open("r", encoding="utf-8") as file:
        return json.load(file)


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(description="Validate Color Atlas asset manifest.")
    parser.add_argument("--catalog", type=Path, default=DEFAULT_CATALOG)
    parser.add_argument("--dry-run", action="store_true", help="Print planned outputs without writing files.")
    return parser.parse_args()


def main() -> int:
    args = parse_args()
    catalog_path = args.catalog if args.catalog.is_absolute() else ROOT / args.catalog
    catalog = load_catalog(catalog_path)
    validator = ManifestValidator(catalog)
    issues = validator.validate()
    errors = [issue for issue in issues if issue.level == "error"]
    warnings = [issue for issue in issues if issue.level == "warning"]

    print(f"Catalog: {catalog_path.relative_to(ROOT)}")
    print(f"Content types: {len(catalog.get('contentTypes', []))}")
    print(f"Hubs: {len(catalog.get('hubs', []))}")
    print(f"Topics: {len(catalog.get('topics', []))}")
    print(f"Printables: {len(catalog.get('printables', []))}")

    if warnings:
        print("\nWarnings:")
        for warning in warnings:
            print(f"- {warning.message}")

    if errors:
        print("\nErrors:")
        for error in errors:
            print(f"- {error.message}")
        return 1

    if args.dry_run:
        print("\nDry-run planned outputs:")
        for line in validator.planned_outputs():
            print(line)

    print("\nPipeline dry run passed. No files were generated.")
    return 0


if __name__ == "__main__":
    sys.exit(main())
