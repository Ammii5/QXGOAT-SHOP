import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'node:path'

// Relative base so dist/index.html can be opened directly as a file,
// or served from any sub-path.
export default defineConfig({
  plugins: [react()],
  base: './',
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        admin: resolve(__dirname, 'admin.html'),
      },
    },
  },
  server: {
    proxy: {
      '/base44': {
        target: 'https://base44-dispatcher-production.base44.workers.dev',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/base44/, '/run'),
      },
    },
  },
})
