import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: ['chunk-pe6mih3x.js?v=39ded934'], // Add the file to exclude
  },
})
