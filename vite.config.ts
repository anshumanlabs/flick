import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(),tailwindcss()],

  // server: {
  //   proxy: {
  //     '/yts-image': {
  //       target: 'https://yts.gg',
  //       changeOrigin: true,
  //       rewrite: (path) => path.replace(/^\/yts-image/, ''),
  //     },
  //   },
  // },
})