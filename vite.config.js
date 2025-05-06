import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: "dist",
  },
});

export default defineConfig({
    base: '/',
    build: {
      outDir: 'dist',
      assetsDir: 'assets'
    }
  })