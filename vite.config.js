import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Relative base so dist/index.html can be opened directly as a file,
// or served from any sub-path.
export default defineConfig({
  plugins: [react()],
  base: './',
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
