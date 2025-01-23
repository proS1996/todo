import { defineConfig } from "vite";
import path from "path";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  base:"./",
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
  },
  build: {
    outDir: "dist", // Specify the output directory for the build
    emptyOutDir: true, // Clear the directory before building
    target: "esnext", // Ensure compatibility with modern environments
  },
  define: {
    "process.env": {}, // Shim `process.env` to avoid issues with some dependencies
  },
  esbuild: {
    jsxInject: `import React from 'react'`, // Automatically import React in JSX files
  }
});
