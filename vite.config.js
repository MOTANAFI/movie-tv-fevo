import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
  const isProduction = mode === 'production';

  return {
    plugins: [react()],
    server: {
      port: 3000
    },
    build: {
      rollupOptions: {
        output: {
          manualChunks: {
            react: ['react'],
            mui: ['@mui/material'],
            swiper: ['swiper'],
            // Add more manual chunks based on your dependencies
          },
        },
      },
      chunkSizeWarningLimit: isProduction ? 1000 : 500, // Adjust the limit based on the mode
    },
  };
});
