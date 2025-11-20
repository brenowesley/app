// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path'; // Módulo nativo do Node para manipulação de caminhos

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      // Mapeia o alias "@" para o diretório "src"
      "@": path.resolve(__dirname, "./src"),
    },
  },
});