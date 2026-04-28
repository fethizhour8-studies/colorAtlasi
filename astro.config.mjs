import { defineConfig } from "astro/config";
import { fileURLToPath } from "node:url";

const site = process.env.SITE_URL || "https://example.com";

export default defineConfig({
  site,
  output: "static",
  trailingSlash: "always",
  vite: {
    resolve: {
      alias: {
        "@components": fileURLToPath(new URL("./src/components", import.meta.url)),
        "@data": fileURLToPath(new URL("./src/data", import.meta.url)),
        "@layouts": fileURLToPath(new URL("./src/layouts", import.meta.url)),
        "@lib": fileURLToPath(new URL("./src/lib", import.meta.url)),
        "@templates": fileURLToPath(new URL("./src/templates", import.meta.url)),
      },
    },
  },
});
