import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5180,
    strictPort: true,
    proxy: {
      // Proxy a Data Dragon (CDN de Riot) — evita problemas de TLS/firewall
      // y CORS al usar rutas relativas en el cliente.
      '/ddragon': {
        target: 'https://ddragon.leagueoflegends.com',
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/ddragon/, ''),
      },
    },
  },
  preview: {
    port: 5180,
    strictPort: true,
  },
})
