import type { Plugin } from 'vite';

/**
 * Un seul endroit connait l'URL publique du site.
 *
 * `index.html` la reclame via `%SITE_URL%` (canonical, og:url, og:image, JSON-LD),
 * et `robots.txt` / `sitemap.xml` sont emis au build a partir de la meme valeur.
 * Ecrire l'URL en dur dans quatre fichiers, c'est se garantir d'en oublier un
 * le jour du branchement du domaine (voir `chore/domain` dans la feuille de route).
 *
 * A regler dans les variables d'environnement de l'hebergeur :
 *   VITE_SITE_URL=https://mon-domaine.fr
 */
const FALLBACK_SITE_URL = 'https://rayan-oughlis.vercel.app';

/** Sans slash final : on concatene toujours des chemins commencant par `/`. */
function normalise(url: string): string {
  return url.trim().replace(/\/+$/, '');
}

/** Les routes a lister dans le sitemap. Le site est une SPA a une seule route. */
const ROUTES = ['/'];

export function seo(): Plugin {
  let siteUrl = FALLBACK_SITE_URL;

  return {
    name: 'portfolio:seo',

    configResolved(config) {
      siteUrl = normalise(config.env.VITE_SITE_URL || FALLBACK_SITE_URL);
      if (config.command === 'build' && !config.env.VITE_SITE_URL) {
        config.logger.warn(
          `[seo] VITE_SITE_URL absent, repli sur ${FALLBACK_SITE_URL}. ` +
            'Les URL canoniques et la carte de partage pointeront la.',
        );
      }
    },

    transformIndexHtml(html) {
      return html.replaceAll('%SITE_URL%', siteUrl);
    },

    generateBundle() {
      const today = new Date().toISOString().slice(0, 10);

      this.emitFile({
        type: 'asset',
        fileName: 'robots.txt',
        source: ['User-agent: *', 'Allow: /', '', `Sitemap: ${siteUrl}/sitemap.xml`, ''].join('\n'),
      });

      const urls = ROUTES.map(
        (route) =>
          `  <url>\n` +
          `    <loc>${siteUrl}${route}</loc>\n` +
          `    <lastmod>${today}</lastmod>\n` +
          `  </url>`,
      ).join('\n');

      this.emitFile({
        type: 'asset',
        fileName: 'sitemap.xml',
        source:
          '<?xml version="1.0" encoding="UTF-8"?>\n' +
          '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' +
          `${urls}\n` +
          '</urlset>\n',
      });
    },
  };
}
