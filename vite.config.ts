import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { aiappRuntimePlugin } from 'vite-plugin-aiapp-runtime'

export default defineConfig({
  plugins: [react(), aiappRuntimePlugin()],
  base: '/',
})
