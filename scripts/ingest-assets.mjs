import fs from "node:fs/promises";
import path from "node:path";
import PDFDocument from "pdfkit";
import sharp from "sharp";
import slugify from "slugify";

const root = process.cwd();
const manifestPath = process.argv[2] || "incoming/manifest.json";
const force = process.argv.includes("--force");
const includePng = process.argv.includes("--with-png");
const brandName = process.env.SITE_BRAND || "Coloring Atlas";
const siteUrl = process.env.SITE_URL || "https://your-domain.com";

const groupByCategory = {
  "animal-coloring-pages": "animals",
  "coloring-pages-for-kids": "kids",
  "adult-coloring-pages": "adults",
  "seasonal-coloring-pages": "seasonal",
  "printable-calendars": "calendars",
};

const typeByCategory = {
  "printable-calendars": "calendar",
};

const locales = ["en", "fr", "es", "pt", "de"];

const manifest = JSON.parse(await fs.readFile(path.join(root, manifestPath), "utf8"));
if (!Array.isArray(manifest)) {
  throw new Error("Manifest must be an array of printable entries.");
}

for (const entry of manifest) {
  await ingestEntry(entry);
}

console.log(`Ingested ${manifest.length} item(s).`);

async function ingestEntry(entry) {
  if (!entry.source || !entry.categoryId || !entry.primaryTopicId || !entry.title?.en || !entry.description?.en) {
    throw new Error("Each entry needs source, categoryId, primaryTopicId, title.en, and description.en.");
  }

  const id = slug(entry.id || entry.title.en);
  const type = entry.type || typeByCategory[entry.categoryId] || "coloring-page";
  const orientation = entry.orientation || (type === "calendar" ? "landscape" : "portrait");
  const baseName = slug(entry.baseName || `${entry.title.en} printable`);
  const group = entry.outputGroup || groupByCategory[entry.categoryId] || "printables";
  const outDir = path.join(root, "public", "downloads", group, id);
  const dataPath = path.join(root, "src", "data", "pages", `${id}.json`);

  try {
    await fs.access(dataPath);
    if (!force) {
      throw new Error(`Data file already exists for ${id}. Re-run with --force to replace it.`);
    }
  } catch (error) {
    if (error.code !== "ENOENT") throw error;
  }

  const sourcePath = path.resolve(root, entry.source);
  const sourceBuffer = await fs.readFile(sourcePath);
  await fs.mkdir(outDir, { recursive: true });

  const printablePdf = path.join(outDir, `${baseName}-printable.pdf`);
  const printablePng = path.join(outDir, `${baseName}-printable.png`);
  const previewWebp = path.join(outDir, `${baseName}-preview.webp`);
  const thumbnailWebp = path.join(outDir, `${baseName}-thumbnail.webp`);

  const sourceImage = await normalizeSourceImage(sourceBuffer, orientation);
  const framedPreview = await createFramedPreview(sourceImage, { entry, type, orientation });

  await sharp(framedPreview)
    .resize({ width: orientation === "landscape" ? 1200 : 900, fit: "inside", withoutEnlargement: false })
    .webp({ quality: 88 })
    .toFile(previewWebp);

  await sharp(framedPreview)
    .resize({ width: 640, height: 480, fit: "contain", background: "#ffffff" })
    .webp({ quality: 84 })
    .toFile(thumbnailWebp);

  if (includePng || entry.formats?.includes("png")) {
    await fs.writeFile(printablePng, sourceImage);
  }

  await writePdf(printablePdf, sourceImage, { entry, type, orientation });

  const publicBase = `/downloads/${group}/${id}`;
  const files = {
    preview: `${publicBase}/${baseName}-preview.webp`,
    thumbnail: `${publicBase}/${baseName}-thumbnail.webp`,
    pdf: `${publicBase}/${baseName}-printable.pdf`,
  };

  if (includePng || entry.formats?.includes("png")) {
    files.png = `${publicBase}/${baseName}-printable.png`;
  }

  const record = {
    id,
    categoryId: entry.categoryId,
    primaryTopicId: entry.primaryTopicId,
    audience: entry.audience || "kids",
    difficulty: entry.difficulty || "easy",
    license: entry.license || "Free for personal, classroom, and non-commercial use.",
    disclosure:
      entry.disclosure || "Created with an AI-assisted workflow and manually reviewed before publishing.",
    slugs: localizedSlugMap(entry.slugs, baseName),
    titles: localizedTextMap(entry.title),
    descriptions: localizedTextMap(entry.description),
    keywords: entry.keywords || [],
    tags: entry.tags || [],
    files,
  };

  await fs.writeFile(dataPath, `${JSON.stringify(record, null, 2)}\n`);
}

async function normalizeSourceImage(sourceBuffer, orientation) {
  const target = orientation === "landscape" ? { width: 3300, height: 2550 } : { width: 2550, height: 3300 };

  return sharp(sourceBuffer, { limitInputPixels: 80_000_000 })
    .rotate()
    .resize({ ...target, fit: "contain", background: "#ffffff" })
    .flatten({ background: "#ffffff" })
    .png({ compressionLevel: 9 })
    .toBuffer();
}

async function createFramedPreview(imageBuffer, { entry, type, orientation }) {
  const canvas = orientation === "landscape" ? { width: 1400, height: 1082 } : { width: 1200, height: 1553 };
  const margin = type === "calendar" ? 74 : 70;
  const footerHeight = 58;
  const inner = {
    width: canvas.width - margin * 2,
    height: canvas.height - margin * 2 - footerHeight,
  };

  const image = await sharp(imageBuffer)
    .resize({ width: inner.width, height: inner.height, fit: "contain", background: "#ffffff" })
    .toBuffer();

  const borderSvg = Buffer.from(`
    <svg width="${canvas.width}" height="${canvas.height}" xmlns="http://www.w3.org/2000/svg">
      <rect width="100%" height="100%" fill="#ffffff"/>
      <rect x="${margin / 2}" y="${margin / 2}" width="${canvas.width - margin}" height="${canvas.height - margin}" rx="12" ry="12" fill="none" stroke="#cbd8d3" stroke-width="3"/>
      <text x="${canvas.width / 2}" y="${canvas.height - 42}" text-anchor="middle" font-family="Arial, sans-serif" font-size="22" fill="#53615c">${escapeXml(brandName)} - ${escapeXml(shortUrl(siteUrl))}</text>
      <text x="${canvas.width / 2}" y="${canvas.height - 18}" text-anchor="middle" font-family="Arial, sans-serif" font-size="14" fill="#7a8580">Free for personal, classroom, and non-commercial use</text>
    </svg>
  `);

  return sharp({
    create: {
      width: canvas.width,
      height: canvas.height,
      channels: 4,
      background: "#ffffff",
    },
  })
    .composite([
      { input: borderSvg, left: 0, top: 0 },
      { input: image, left: margin, top: margin },
    ])
    .webp({ quality: 90 })
    .toBuffer();
}

async function writePdf(filePath, imageBuffer, { entry, type, orientation }) {
  await new Promise((resolve, reject) => {
    const doc = new PDFDocument({
      size: "LETTER",
      layout: orientation === "landscape" ? "landscape" : "portrait",
      margin: 0,
      info: {
        Title: entry.title.en,
        Author: brandName,
        Subject: entry.description.en,
        Keywords: (entry.keywords || []).join(", "),
        Creator: `${brandName} printable pipeline`,
        Producer: `${brandName} printable pipeline`,
      },
    });

    const chunks = [];
    doc.on("data", (chunk) => chunks.push(chunk));
    doc.on("end", async () => {
      try {
        await fs.writeFile(filePath, Buffer.concat(chunks));
        resolve();
      } catch (error) {
        reject(error);
      }
    });
    doc.on("error", reject);

    const pageWidth = doc.page.width;
    const pageHeight = doc.page.height;
    const margin = type === "calendar" ? 28 : 24;
    const footerHeight = 28;
    const frame = {
      x: margin,
      y: margin,
      width: pageWidth - margin * 2,
      height: pageHeight - margin * 2,
    };
    const imageBox = {
      x: frame.x + 14,
      y: frame.y + 14,
      width: frame.width - 28,
      height: frame.height - footerHeight - 22,
    };

    doc.save();
    doc.roundedRect(frame.x, frame.y, frame.width, frame.height, 8).lineWidth(0.75).strokeColor("#cbd8d3").stroke();
    doc.image(imageBuffer, imageBox.x, imageBox.y, {
      fit: [imageBox.width, imageBox.height],
      align: "center",
      valign: "center",
    });

    const footer = `${brandName} - ${shortUrl(siteUrl)} - Free for personal, classroom, and non-commercial use`;
    doc
      .font("Helvetica")
      .fontSize(type === "calendar" ? 7 : 6.5)
      .fillColor("#53615c")
      .text(footer, frame.x + 12, pageHeight - margin - 18, {
        width: frame.width - 24,
        align: "center",
        lineBreak: false,
      });
    doc.restore();
    doc.end();
  });
}

function localizedTextMap(value) {
  const fallback = value.en;
  return Object.fromEntries(locales.map((locale) => [locale, value[locale] || fallback]));
}

function localizedSlugMap(value = {}, fallback) {
  return Object.fromEntries(locales.map((locale) => [locale, slug(value[locale] || fallback)]));
}

function slug(value) {
  return slugify(String(value), { lower: true, strict: true, trim: true });
}

function shortUrl(value) {
  try {
    return new URL(value).hostname.replace(/^www\./, "");
  } catch {
    return value.replace(/^https?:\/\//, "").replace(/\/$/, "");
  }
}

function escapeXml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}
