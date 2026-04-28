const siteUrl = (import.meta.env.SITE || "https://example.com").replace(/\/$/, "");

const body = `User-agent: *
Allow: /

Sitemap: ${siteUrl}/sitemap.xml
`;

export const GET = () =>
  new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
    },
  });
