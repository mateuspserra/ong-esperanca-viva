import { cpSync, existsSync } from "node:fs";
import { resolve } from "node:path";
import { defineConfig } from "vite";

function copiarImagens() {
  return {
    name: "copiar-imagens-estaticas",
    closeBundle() {
      const origem = resolve("imagens");
      const destino = resolve("dist/imagens");

      if (existsSync(origem)) {
        cpSync(origem, destino, { recursive: true });
      }
    }
  };
}

export default defineConfig({
  root: ".",
  base: "./",
  plugins: [copiarImagens()],
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
