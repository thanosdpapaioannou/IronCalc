import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';
import { resolve } from 'node:path';

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'IronCalc',
      // the proper extensions will be added
      fileName: (format) => `ironcalc.${format === 'umd' ? 'umd.js' : 'js'}`,
    },
    rollupOptions: {
      // make sure to externalize deps that shouldn't be bundled
      // into your library
      external: ['@ironcalc/wasm'],
      output: {
        // Provide global variables to use in the UMD build
        // for externalized deps
        globals: {
          '@ironcalc/wasm': 'IronCalcWasm',
        },
      },
    },
  },
  plugins: [react(), svgr()],
  server: {
    fs: {
      // Allow serving files from one level up to the project root
      allow: ['..'],
    },
  },
});
