import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

export default defineConfig({
  plugins: [react()],
  
  build: {
    lib: {
      formats: ['es', 'umd'],
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'index',
      fileName: (format) => `index.${format}.js`,
    },
    rollupOptions: {
      external: ['react', 'react-dom','react-markdown','framer-motion'],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM'
        },
      },
    },
  },
  server: {
    open: true,
    strictPort: true,
    allowedHosts:['vps-32f8344e.vps.ovh.net', 'localhost', '51.75.124.64']
  }
})
