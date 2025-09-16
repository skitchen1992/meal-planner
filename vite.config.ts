import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // Use env-driven base so the same config works locally and on GitHub Pages
  // VITE_BASE should be like "/repo-name/" for GitHub Pages, defaults to "/" for local
  base: process.env.VITE_BASE || '/',
});
