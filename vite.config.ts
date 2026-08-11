import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],

  server: {
    proxy: {
      '/yts-image': {
        target: 'https://yts.gg',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/yts-image/, ''),
      },
    },
  },
})