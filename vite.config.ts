import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { aiappRuntimePlugin } from 'vite-plugin-aiapp-runtime'
import path from 'path'

export default defineConfig({
  plugins: [react(), aiappRuntimePlugin()],
  base: '/',
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})
