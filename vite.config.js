import { defineConfig } from 'vite';
import fs from 'node:fs';
import path from 'node:path';

function htmlInjectLoad() {
  return {
    name: 'html-inject-load',
    enforce: 'pre',
    transformIndexHtml: {
      order: 'pre',
      handler(html) {
        const re = /<load\s+src=["']([^"']+)["']\s*\/?>/g;

        return html.replace(re, (match, src) => {
          const filePath = path.resolve(process.cwd(), src);

          try {
            let content = fs.readFileSync(filePath, 'utf-8');

            content = content.replace(re, (m, innerSrc) => {
              const innerPath = path.resolve(process.cwd(), innerSrc);
              return fs.readFileSync(innerPath, 'utf-8');
            });

            return content;
          } catch (e) {
            this.warn(`[html-inject-load] ${e.message}: ${filePath}`);
            return `<!-- not found: ${src} -->`;
          }
        });
      },
    },
  };
}

export default defineConfig({
  plugins: [htmlInjectLoad()],
});
