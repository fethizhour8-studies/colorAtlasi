import fs from "node:fs/promises";
import path from "node:path";
import PDFDocument from "pdfkit";
import sharp from "sharp";

const root = process.cwd();
const brandName = process.env.SITE_BRAND || "Coloring Atlas";
const siteUrl = process.env.SITE_URL || "https://your-domain.com";

const samples = [
  {
    name: "rainforest-animals-coloring-page",
    dir: "public/downloads/animals/rainforest-animals",
    svg: rainforestAnimals(),
  },
  {
    name: "friendly-dinosaur-coloring-page",
    dir: "public/downloads/kids/friendly-dinosaur",
    svg: friendlyDinosaur(),
  },
  {
    name: "cozy-cottage-mandala-coloring-page",
    dir: "public/downloads/adults/cozy-cottage-mandala",
    svg: cozyCottageMandala(),
  },
  {
    name: "geometric-flower-mandala-coloring-page",
    dir: "public/downloads/mandalas/geometric-flower-mandala",
    svg: geometricFlowerMandala(),
  },
  {
    name: "cute-unicorn-stars-coloring-page",
    dir: "public/downloads/cute/cute-unicorn-stars",
    svg: cuteUnicornStars(),
  },
  {
    name: "christmas-ornaments-coloring-page",
    dir: "public/downloads/seasonal/christmas-ornaments",
    svg: christmasOrnaments(),
  },
  {
    name: "2026-one-page-printable-calendar",
    dir: "public/downloads/calendars/one-page-calendar-2026",
    svg: calendar2026(),
    orientation: "landscape",
    type: "calendar",
  },
];

for (const sample of samples) {
  await writePrintable(sample);
}

console.log(`Generated ${samples.length} starter printable asset sets.`);

async function writePrintable(sample) {
  const outDir = path.join(root, sample.dir);
  await fs.mkdir(outDir, { recursive: true });
  const svgBuffer = Buffer.from(sample.svg);
  const printablePng = path.join(outDir, `${sample.name}-printable.png`);
  const previewWebp = path.join(outDir, `${sample.name}-preview.webp`);
  const thumbnailWebp = path.join(outDir, `${sample.name}-thumbnail.webp`);
  const printablePdf = path.join(outDir, `${sample.name}-printable.pdf`);
  const orientation = sample.orientation || "portrait";
  const target = orientation === "landscape" ? { width: 3300, height: 2550 } : { width: 2550, height: 3300 };

  const pngBuffer = await sharp(svgBuffer)
    .resize({ ...target, fit: "contain", background: "#ffffff" })
    .png({ compressionLevel: 9 })
    .toBuffer();
  const framedPreview = await createFramedPreview(pngBuffer, {
    type: sample.type || "coloring-page",
    orientation,
  });

  await fs.writeFile(printablePng, pngBuffer);

  await sharp(framedPreview)
    .resize({ width: orientation === "landscape" ? 1200 : 900, fit: "inside", withoutEnlargement: false })
    .webp({ quality: 88 })
    .toFile(previewWebp);

  await sharp(framedPreview)
    .resize({ width: 640, height: 480, fit: "contain", background: "#ffffff" })
    .webp({ quality: 84 })
    .toFile(thumbnailWebp);

  await writePdf(printablePdf, pngBuffer, {
    title: sample.name.replace(/-/g, " "),
    type: sample.type || "coloring-page",
    orientation,
  });
}

async function createFramedPreview(imageBuffer, { type, orientation }) {
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
    create: { width: canvas.width, height: canvas.height, channels: 4, background: "#ffffff" },
  })
    .composite([
      { input: borderSvg, left: 0, top: 0 },
      { input: image, left: margin, top: margin },
    ])
    .webp({ quality: 90 })
    .toBuffer();
}

async function writePdf(filePath, pngBuffer, { title, type, orientation }) {
  await new Promise((resolve, reject) => {
    const doc = new PDFDocument({
      size: "LETTER",
      layout: orientation === "landscape" ? "landscape" : "portrait",
      margin: 0,
      info: {
        Title: title,
        Author: brandName,
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
    doc.roundedRect(frame.x, frame.y, frame.width, frame.height, 8).lineWidth(0.75).strokeColor("#cbd8d3").stroke();
    doc.image(pngBuffer, imageBox.x, imageBox.y, {
      fit: [imageBox.width, imageBox.height],
      align: "center",
      valign: "center",
    });
    doc
      .font("Helvetica")
      .fontSize(type === "calendar" ? 7 : 6.5)
      .fillColor("#53615c")
      .text(`${brandName} - ${shortUrl(siteUrl)} - Free for personal, classroom, and non-commercial use`, frame.x + 12, pageHeight - margin - 18, {
        width: frame.width - 24,
        align: "center",
        lineBreak: false,
      });
    doc.end();
  });
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

function baseSvg(content) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 900 1200">
  <rect width="900" height="1200" fill="#fff"/>
  <g fill="none" stroke="#111" stroke-width="10" stroke-linecap="round" stroke-linejoin="round">
    ${content}
  </g>
</svg>`;
}

function rainforestAnimals() {
  return baseSvg(`
    <path d="M115 1020c95-120 166-258 187-437"/>
    <path d="M760 1030c-70-125-101-270-92-433"/>
    <path d="M120 410c82-84 200-116 333-68 88-80 224-92 334-22"/>
    <path d="M95 514c111-50 236-52 364-6 111-65 226-70 345-15"/>
    <path d="M232 735c-52 8-94-21-101-64-8-45 25-87 76-95 52-8 95 20 102 64 8 45-25 87-77 95z"/>
    <path d="M188 622c-39-58-18-118 42-145 39 48 36 105-42 145z"/>
    <path d="M284 614c42-54 104-50 141-4-35 50-88 67-141 4z"/>
    <circle cx="226" cy="658" r="10"/>
    <path d="M506 722c-26-72 15-142 91-154 62 39 65 125 9 175-31 28-71 32-100-21z"/>
    <path d="M579 575c33-64 101-84 157-42-8 75-55 117-157 42z"/>
    <path d="M540 720c-29 44-80 58-130 37"/>
    <circle cx="578" cy="637" r="11"/>
    <path d="M325 935c96-70 173-73 245 0"/>
    <path d="M362 875c-30-50-18-94 35-127 44 36 49 81-35 127z"/>
    <path d="M540 875c30-50 18-94-35-127-44 36-49 81 35 127z"/>
  `);
}

function friendlyDinosaur() {
  return baseSvg(`
    <path d="M220 786c15-190 125-318 290-318 137 0 244 87 262 228 15 121-71 225-220 225H342c-79 0-128-52-122-135z"/>
    <path d="M497 468c32-116 119-184 229-172 93 11 146 85 136 164-12 96-99 143-206 124"/>
    <circle cx="722" cy="400" r="13"/>
    <path d="M772 483c-27 17-59 22-93 16"/>
    <path d="M352 493l-45-81 92 27-7-96 77 58 36-92 45 91 75-58-9 96 92-27-45 81"/>
    <path d="M344 920l-32 116h125l-22-116"/>
    <path d="M564 920l35 116h125l-58-130"/>
    <path d="M219 793c-76 50-139 37-182-37 84-12 145 0 182 37z"/>
    <path d="M391 675c28 32 72 32 100 0"/>
    <circle cx="414" cy="616" r="10"/>
    <circle cx="506" cy="616" r="10"/>
  `);
}

function cozyCottageMandala() {
  return baseSvg(`
    <circle cx="450" cy="590" r="360"/>
    <circle cx="450" cy="590" r="285"/>
    <circle cx="450" cy="590" r="210"/>
    <path d="M260 610l190-160 190 160v205H260z"/>
    <path d="M220 620l230-198 230 198"/>
    <path d="M390 815V670h120v145"/>
    <path d="M305 645h70v70h-70zM525 645h70v70h-70z"/>
    <path d="M280 910c48-74 91-74 139 0M481 910c48-74 91-74 139 0"/>
    <path d="M126 590c76-50 128-50 204 0-76 50-128 50-204 0z"/>
    <path d="M570 590c76-50 128-50 204 0-76 50-128 50-204 0z"/>
    <path d="M450 230c50 76 50 128 0 204-50-76-50-128 0-204z"/>
    <path d="M450 746c50 76 50 128 0 204-50-76-50-128 0-204z"/>
    <path d="M210 350c88 4 133 49 137 137-88-4-133-49-137-137z"/>
    <path d="M553 487c4-88 49-133 137-137-4 88-49 133-137 137z"/>
  `);
}

function geometricFlowerMandala() {
  const petals = Array.from({ length: 16 }, (_, index) => {
    const angle = (index * 22.5 * Math.PI) / 180;
    const x = 450 + Math.cos(angle) * 220;
    const y = 600 + Math.sin(angle) * 220;
    return `<ellipse cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" rx="64" ry="128" transform="rotate(${index * 22.5} ${x.toFixed(1)} ${y.toFixed(1)})"/>`;
  }).join("");

  return baseSvg(`
    <circle cx="450" cy="600" r="370"/>
    <circle cx="450" cy="600" r="300"/>
    <circle cx="450" cy="600" r="220"/>
    ${petals}
    <circle cx="450" cy="600" r="96"/>
    <circle cx="450" cy="600" r="36"/>
    <path d="M450 230v740M80 600h740M189 339l522 522M711 339L189 861"/>
    <path d="M285 600c84-126 246-126 330 0-84 126-246 126-330 0z"/>
    <path d="M450 435c126 84 126 246 0 330-126-84-126-246 0-330z"/>
  `);
}

function cuteUnicornStars() {
  return baseSvg(`
    <path d="M250 820c-20-214 64-353 221-415 143-57 292 11 344 157 42 119-7 254-124 333-130 88-310 61-441-75z"/>
    <path d="M365 430l-20-190 130 139"/>
    <path d="M475 379l118-150 20 202"/>
    <path d="M438 390c-45-111-10-199 103-268 56 102 21 192-103 268z"/>
    <path d="M294 545c87-83 198-98 331-45"/>
    <circle cx="604" cy="585" r="13"/>
    <path d="M658 680c-50 38-105 43-165 14"/>
    <path d="M298 773c91 58 182 58 273 0"/>
    <path d="M163 315l31 60 68 10-49 47 12 67-62-32-61 32 12-67-49-47 68-10z"/>
    <path d="M730 260l22 43 48 7-35 34 9 47-44-23-43 23 8-47-34-34 48-7z"/>
    <path d="M706 928l27 53 59 9-43 41 10 58-53-28-52 28 10-58-43-41 59-9z"/>
  `);
}

function christmasOrnaments() {
  return baseSvg(`
    <path d="M170 245c145 80 415 80 560 0"/>
    <path d="M275 250v154M450 272v118M625 250v154"/>
    <rect x="232" y="390" width="86" height="54" rx="10"/>
    <rect x="407" y="376" width="86" height="54" rx="10"/>
    <rect x="582" y="390" width="86" height="54" rx="10"/>
    <circle cx="275" cy="570" r="126"/>
    <circle cx="450" cy="574" r="156"/>
    <circle cx="625" cy="570" r="126"/>
    <path d="M188 570h174M275 444v252M214 488c44 40 79 40 122 0M214 652c44-40 79-40 122 0"/>
    <path d="M326 574h248M450 418v312M348 476c68 58 136 58 204 0M348 672c68-58 136-58 204 0"/>
    <path d="M538 570h174M625 444v252M564 488c44 40 79 40 122 0M564 652c44-40 79-40 122 0"/>
    <path d="M286 832l34 67 74 11-54 52 13 73-67-35-66 35 13-73-54-52 74-11z"/>
    <path d="M594 832l34 67 74 11-54 52 13 73-67-35-66 35 13-73-54-52 74-11z"/>
  `);
}

function calendar2026() {
  const months = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
  const monthBlocks = months
    .map((month, index) => {
      const col = index % 3;
      const row = Math.floor(index / 3);
      const x = 80 + col * 255;
      const y = 215 + row * 210;
      const cells = Array.from({ length: 35 }, (_, cell) => {
        const cx = x + 18 + (cell % 7) * 31;
        const cy = y + 58 + Math.floor(cell / 7) * 25;
        return `<rect x="${cx}" y="${cy}" width="20" height="15" rx="2"/>`;
      }).join("");
      return `<g>
        <rect x="${x}" y="${y}" width="220" height="170" rx="12"/>
        <text x="${x + 110}" y="${y + 38}" text-anchor="middle" font-family="Arial" font-size="30" font-weight="700" fill="#111">${month}</text>
        ${cells}
      </g>`;
    })
    .join("");

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 900 1200">
    <rect width="900" height="1200" fill="#fff"/>
    <g fill="none" stroke="#111" stroke-width="7" stroke-linecap="round" stroke-linejoin="round">
      <rect x="58" y="70" width="784" height="1030" rx="28"/>
      <path d="M180 150h540"/>
      ${monthBlocks}
    </g>
    <text x="450" y="145" text-anchor="middle" font-family="Arial" font-size="72" font-weight="800" fill="#111">2026</text>
  </svg>`;
}
