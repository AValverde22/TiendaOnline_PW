import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true, // permite conexiones externas
    allowedHosts: [
      'sheathy-arely-zesty.ngrok-free.dev' // 👈 dominio que te dio ngrok
    ]
  }
})
