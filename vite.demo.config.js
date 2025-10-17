import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  root: './demo',
  build: {
    outDir: '../demo-dist'
  },
  server: {
    port: 3000
  }
})
