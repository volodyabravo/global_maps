import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react({
    tsDecorators: true
  })],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:8000',
        changeOrigin: true,
      },
      '/admin/': {
        target: 'http://localhost:8000',
        changeOrigin: true,
      },
      '/djangostatic/': {
        target: 'http://localhost:8000',
        changeOrigin: true,
      },
      '/media/': {
        target: 'http://localhost:8000',
        changeOrigin: true,
      },
    },
  },
})
