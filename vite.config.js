import { defineConfig } from 'vite';
import { resolve } from 'node:path';
import fs from 'node:fs';

const rootDir = import.meta.dirname;

function htmlInjectLoad() {
  const re = /<load\s+src=["']([^"']+)["']\s*\/?>/g;

  const inline = (html) =>
    html.replace(re, (match, src) => {
      const filePath = resolve(rootDir, src);
      try {
        const content = fs.readFileSync(filePath, 'utf-8');
        return inline(content);
      } catch (e) {
        console.warn(`[html-inject-load] ${e.message}: ${filePath}`);
        return `<!-- not found: ${src} -->`;
      }
    });

  return {
    name: 'html-inject-load',
    enforce: 'pre',
    transformIndexHtml: {
      order: 'pre',
      handler(html) {
        return inline(html);
      },
    },
  };
}

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(rootDir, 'index.html'),
        catalog: resolve(rootDir, 'catalog.html'),
      },
    },
  },
  plugins: [htmlInjectLoad()],
});
