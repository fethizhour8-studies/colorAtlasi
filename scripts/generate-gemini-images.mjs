import { mkdirSync, writeFileSync } from "node:fs";
import { readFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import slugify from "slugify";

const [, , promptManifestPath = "incoming/image-prompts.example.json"] = process.argv;
const apiKey = process.env.GEMINI_API_KEY;
const model = process.env.GEMINI_IMAGE_MODEL || "gemini-2.5-flash-image";
const outputDir = process.env.GENERATED_IMAGE_DIR || "incoming/generated";
const manifestOutputPath = process.env.GENERATED_MANIFEST_PATH || "incoming/manifest.generated.json";

if (!apiKey) {
  console.error("Missing GEMINI_API_KEY. Add it to your local environment only; never commit API keys.");
  process.exit(1);
}

const raw = await readFile(promptManifestPath, "utf8");
const jobs = JSON.parse(raw);

if (!Array.isArray(jobs) || jobs.length === 0) {
  console.error("Prompt manifest must be a non-empty JSON array.");
  process.exit(1);
}

mkdirSync(outputDir, { recursive: true });
mkdirSync(dirname(manifestOutputPath), { recursive: true });

const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent`;

function slug(value) {
  return slugify(value, { lower: true, strict: true, trim: true });
}

function textValue(value) {
  if (typeof value === "string") return value;
  return value?.en || "Untitled Coloring Page";
}

function buildPrompt(job) {
  const title = textValue(job.title);
  const audience = job.audience || "kids";
  const difficulty = job.difficulty || "easy";
  const topic = job.topic || title;
  const keywords = Array.isArray(job.keywords) ? job.keywords.join(", ") : "printable coloring page";
  const composition = job.composition || "single centered subject with a clean background";

  return [
    `Create an original black-and-white printable coloring page titled: ${title}.`,
    `Topic: ${topic}. Audience: ${audience}. Difficulty: ${difficulty}. Keywords: ${keywords}.`,
    `Composition: ${composition}.`,
    "Style requirements: clean vector-like line art, white background, thick clear outlines, no grayscale shading, no filled black areas, no watermarks, no text, no signature, no logo, no color.",
    "Print requirements: portrait US Letter coloring sheet, centered subject, generous margins, suitable for conversion to PDF.",
    "Safety and copyright requirements: do not depict copyrighted characters, brand mascots, celebrities, movie/game/anime characters, logos, trademarks, or recognizable franchise designs. Make the design generic and original.",
  ].join("\n");
}

async function generateImage(job, index) {
  const prompt = buildPrompt(job);
  const body = {
    contents: [{ parts: [{ text: prompt }] }],
  };

  const response = await fetch(endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-goog-api-key": apiKey,
    },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Gemini image generation failed for item ${index + 1}: ${response.status} ${errorText}`);
  }

  const data = await response.json();
  const parts = data?.candidates?.flatMap((candidate) => candidate?.content?.parts || []) || [];
  const imagePart = parts.find((part) => part?.inlineData?.data || part?.inline_data?.data);
  const inlineData = imagePart?.inlineData || imagePart?.inline_data;

  if (!inlineData?.data) {
    throw new Error(`No image data returned for item ${index + 1}. Response text: ${JSON.stringify(parts)}`);
  }

  const mimeType = inlineData.mimeType || inlineData.mime_type || "image/png";
  const extension = mimeType.includes("jpeg") || mimeType.includes("jpg") ? "jpg" : "png";
  const filename = `${slug(textValue(job.title)) || `generated-page-${index + 1}`}.${extension}`;
  const filePath = join(outputDir, filename);
  writeFileSync(filePath, Buffer.from(inlineData.data, "base64"));
  return filePath.replace(/\\/g, "/");
}

const generatedManifest = [];

for (const [index, job] of jobs.entries()) {
  const source = await generateImage(job, index);
  generatedManifest.push({
    source,
    categoryId: job.categoryId,
    primaryTopicId: job.primaryTopicId,
    type: job.type || "coloring-page",
    orientation: job.orientation || "portrait",
    audience: job.audience || "kids",
    difficulty: job.difficulty || "easy",
    title: job.title,
    description: job.description,
    keywords: job.keywords || [],
    tags: job.tags || [],
  });
  console.log(`Generated ${source}`);
}

writeFileSync(manifestOutputPath, `${JSON.stringify(generatedManifest, null, 2)}\n`);
console.log(`Wrote ingest manifest to ${manifestOutputPath}`);
