import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { ViteWebfontDownload } from 'vite-plugin-webfont-dl';
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(),ViteWebfontDownload(),],
})
