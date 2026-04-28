import type { APIRoute } from "astro";

export const GET: APIRoute = ({ site }) => {
  const base = site || new URL("https://example.com");
  const sitemap = new URL("/sitemap.xml", base).toString();

  return new Response(
    [
      "User-agent: *",
      "Allow: /",
      "",
      "User-agent: OAI-SearchBot",
      "Allow: /",
      "",
      "User-agent: ChatGPT-User",
      "Allow: /",
      "",
      "User-agent: Googlebot",
      "Allow: /",
      "",
      "User-agent: Bingbot",
      "Allow: /",
      "",
      "Disallow: /admin/",
      "Disallow: /api/",
      "",
      `Sitemap: ${sitemap}`,
      "",
    ].join("\n"),
    { headers: { "Content-Type": "text/plain; charset=utf-8" } },
  );
};
