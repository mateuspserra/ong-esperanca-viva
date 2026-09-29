import { defineConfig } from "vite";

export default defineConfig({
  root: ".",
  base: "./",
  build: {
    outDir: "dist",
    emptyOutDir: true,
    minify: "esbuild",
    cssMinify: "esbuild",
    sourcemap: false,
    rollupOptions: {
      input: "html/index.html"
    }
  }
});
