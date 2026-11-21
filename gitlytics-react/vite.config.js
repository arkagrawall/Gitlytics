import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// base: './' lets the production build open from any folder (e.g. GitHub Pages)
export default defineConfig({
  plugins: [react()],
  base: './',
})
