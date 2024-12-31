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
      ],
    }),
  ],
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: {
        main: './index.html', // Main entry file
        content: './content.js', // Include content.js in the input
      },
      output: {
        entryFileNames: '[name].js', // Use filename as the entry name
      },
    },
  },
});
