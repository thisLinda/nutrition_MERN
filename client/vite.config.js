import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// set up proxy to enable React app to communicate with the Express backend
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': 'http://localhost:5001'
    }
  }
});
