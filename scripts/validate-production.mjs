import { existsSync, readFileSync } from "node:fs";

const args = new Set(process.argv.slice(2));
const checkEnv = args.has("--env") || args.size === 0;
const checkDist = args.has("--dist") || args.size === 0;
const errors = [];
const warnings = [];

function fail(message) {
  errors.push(message);
}

function warn(message) {
  warnings.push(message);
}

function env(name) {
  return process.env[name]?.trim() || "";
}

function isPlaceholder(value) {
  return /example\.com|your-domain|localhost|127\.0\.0\.1/i.test(value);
}

function validateUrl(name, value) {
  if (!value) {
    fail(`${name} is required for production.`);
    return;
  }

  try {
    const url = new URL(value);
    if (url.protocol !== "https:") {
      fail(`${name} must use https.`);
    }
    if (isPlaceholder(url.hostname)) {
      fail(`${name} still uses a placeholder or local host: ${value}`);
    }
  } catch {
    fail(`${name} must be a valid absolute URL.`);
  }
}

if (checkEnv) {
  const siteUrl = env("SITE_URL");
  const contactEmail = env("PUBLIC_CONTACT_EMAIL");
  const adsEnabled = env("PUBLIC_ADSENSE_ENABLED") === "true";

  validateUrl("SITE_URL", siteUrl);

  if (!contactEmail) {
    fail("PUBLIC_CONTACT_EMAIL is required so trust pages do not ship with a placeholder email.");
  } else if (isPlaceholder(contactEmail)) {
    fail(`PUBLIC_CONTACT_EMAIL still looks like a placeholder: ${contactEmail}`);
  }

  if (adsEnabled) {
    const client = env("PUBLIC_ADSENSE_CLIENT");
    const slots = [
      "PUBLIC_ADSENSE_SLOT_LEADERBOARD",
      "PUBLIC_ADSENSE_SLOT_RECTANGLE",
      "PUBLIC_ADSENSE_SLOT_SIDEBAR",
    ];

    if (!/^ca-pub-\d+$/.test(client)) {
      fail("PUBLIC_ADSENSE_CLIENT must look like ca-pub-1234567890 when AdSense is enabled.");
    }

    for (const slot of slots) {
      if (!/^\d+$/.test(env(slot))) {
        fail(`${slot} must be set to the numeric AdSense slot ID when AdSense is enabled.`);
      }
    }

    if (env("PUBLIC_GOOGLE_CERTIFIED_CMP") !== "true") {
      fail("PUBLIC_GOOGLE_CERTIFIED_CMP=true is required before enabling AdSense for a multilingual site with EU/UK/Swiss traffic.");
    }
  } else {
    warn("PUBLIC_ADSENSE_ENABLED is not true, so real ad code will not be rendered.");
  }
}

if (checkDist) {
  if (!existsSync("dist")) {
    fail("dist/ does not exist. Run npm run build before --dist validation.");
  } else {
    const scanFiles = ["dist/sitemap.xml", "dist/robots.txt", "dist/llms.txt"];
    for (const file of scanFiles) {
      if (!existsSync(file)) {
        fail(`${file} is missing.`);
        continue;
      }
      const content = readFileSync(file, "utf8");
      if (/https:\/\/example\.com|your-domain\.com|hello@your-domain\.com/i.test(content)) {
        fail(`${file} still contains placeholder production data.`);
      }
    }

    const headersPath = "dist/_headers";
    if (!existsSync(headersPath)) {
      fail("dist/_headers is missing.");
    } else {
      const headers = readFileSync(headersPath, "utf8");
      for (const required of ["Content-Security-Policy", "X-Content-Type-Options", "Referrer-Policy", "Permissions-Policy"]) {
        if (!headers.includes(required)) {
          fail(`dist/_headers is missing ${required}.`);
        }
      }
    }

    const htaccessPath = "dist/.htaccess";
    if (!existsSync(htaccessPath)) {
      warn("dist/.htaccess is missing. This is required for cPanel/Apache header deployment.");
    } else {
      const htaccess = readFileSync(htaccessPath, "utf8");
      for (const required of ["Content-Security-Policy", "X-Content-Type-Options", "Referrer-Policy", "Permissions-Policy"]) {
        if (!htaccess.includes(required)) {
          fail(`dist/.htaccess is missing ${required}.`);
        }
      }
    }
  }
}

for (const message of warnings) {
  console.warn(`Warning: ${message}`);
}

if (errors.length > 0) {
  console.error("Production validation failed:");
  for (const message of errors) {
    console.error(`- ${message}`);
  }
  process.exit(1);
}

console.log("Production validation passed.");
