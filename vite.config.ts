import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { viteStaticCopy } from 'vite-plugin-static-copy';

export default defineConfig({
  plugins: [
    react(),
    viteStaticCopy({
      targets: [
        {
          src: 'manifest.json',
          dest: '.', // Copy to the root of the 'dist' folder
        },
        {
          src: 'content.css',
          dest: '.', // Copy to the root of the 'dist' folder
        },
        {
          src: 'content.js',
          dest: '.', // Copy to the root of the 'dist' folder
        },
        {
          src: 'icons/*', // Copy all files inside the 'icons' folder
          dest: 'icons', // Copy to 'dist/icons'
        },
      ],
    }),
  ],
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: {
        main: './index.html',
        content: './content.js',
      },
      output: {
        entryFileNames: '[name].js',
      },
    },
  },
});
