import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/Github-Portfolio/',
  assetsInclude: ['**/*.pdf'], // <-- Tells Vite to process your research PDFs as static assets
})