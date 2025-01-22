// import { defineConfig } from 'vite';
// import react from '@vitejs/plugin-react';

// // Vite configuration
// export default defineConfig({
//   plugins: [react()],
//   resolve: {
//     extensions: ['.js', '.jsx'], // Support both .js and .jsx file extensions,
//     alias: {
//       '@src': 'src',
//       '@components': 'src/components',
//       '@features': 'src/features',
//       '@hooks': 'src/hooks',
//       '@pages': 'src/pages',
//       '@services': 'src/services',
//       '@utils': 'src/utils',
//       '@routes': 'src/routes',
//       '@modules': 'src/modules',
//       '@app': 'src/app',
//     },
//   },
//   server: {
//     open: true, // Automatically open the browser on server start
//   },
// });

import { defineConfig } from "vite";
import path from "path";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@src": path.resolve(__dirname, "src"),
      "@components": path.resolve(__dirname, "src/components"),
      "@features": path.resolve(__dirname, "src/features"),
      "@hooks": path.resolve(__dirname, "src/hooks"),
      "@pages": path.resolve(__dirname, "src/pages"),
      "@services": path.resolve(__dirname, "src/services"),
      "@utils": path.resolve(__dirname, "src/utils"),
      "@routes": path.resolve(__dirname, "src/routes"),
      "@modules": path.resolve(__dirname, "src/modules"),
      "@app": path.resolve(__dirname, "src/app")
    }
  },
  server: {
    open: true
  }
});
