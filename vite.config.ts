import { fileURLToPath, URL } from 'node:url';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

import { seo } from './vite/seo';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), seo()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
});
