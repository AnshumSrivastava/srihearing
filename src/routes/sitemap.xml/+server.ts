import { posts } from '$lib/blogData';

export const prerender = true;

export const GET = () => {
  const domain = 'https://www.srihearing.in';
  const langs = ['en', 'pa', 'hi'] as const;
  
  // Define static paths (base is '/' for en, or path)
  const staticPaths = ['', '/services', '/blog', '/hearing-test'];
  
  // Collect all paths
  const urls: { loc: string; alternates: { lang: string; href: string }[] }[] = [];
  
  // Helper to construct path for language
  const getPath = (basePath: string, lang: 'en' | 'pa' | 'hi') => {
    if (lang === 'en') return basePath || '/';
    return `/${lang}${basePath}`;
  };

  // Add static paths
  for (const path of staticPaths) {
    for (const lang of langs) {
      const loc = `${domain}${getPath(path, lang)}`;
      const alternates = langs.map(l => ({
        lang: l,
        href: `${domain}${getPath(path, l)}`
      }));
      urls.push({ loc, alternates });
    }
  }

  // Add blog post paths
  for (const post of posts) {
    for (const lang of langs) {
      const loc = `${domain}${getPath(`/blog/${post.id}`, lang)}`;
      const alternates = langs.map(l => ({
        lang: l,
        href: `${domain}${getPath(`/blog/${post.id}`, l)}`
      }));
      urls.push({ loc, alternates });
    }
  }

  const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
  ${urls.map(({ loc, alternates }) => `
  <url>
    <loc>${loc}</loc>
    ${alternates.map(({ lang, href }) => `<xhtml:link rel="alternate" hreflang="${lang}" href="${href}" />`).join('\n    ')}
    <xhtml:link rel="alternate" hreflang="x-default" href="${alternates.find(a => a.lang === 'en')?.href}" />
    <changefreq>monthly</changefreq>
    <priority>${loc.endsWith('/') || loc.endsWith('/pa') || loc.endsWith('/hi') ? '1.0' : '0.8'}</priority>
  </url>`).join('')}
</urlset>`;

  return new Response(sitemapXml.trim(), {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'max-age=3600'
    }
  });
};
