import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    open: '/home', // Esto abrirá directamente la ruta /home cuando inicies el servidor
    port: 5173
  }
})

