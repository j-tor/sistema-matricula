import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5174,
    proxy: {
      // Reenvía las peticiones /api al backend
      '/api': {
        target: 'http://localhost:3005',
        changeOrigin: true,
      },
      '/health': {
        target: 'http://localhost:3005',
        changeOrigin: true,
      },
    },
  },
});

