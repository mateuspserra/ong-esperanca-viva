import { cpSync, existsSync, writeFileSync } from "node:fs";
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

      writeFileSync(
        resolve("dist/index.html"),
        '<!doctype html><html lang="pt-BR"><head><meta charset="utf-8"><meta http-equiv="refresh" content="0;url=./html/"><title>ONG Esperança Viva</title></head><body><p><a href="./html/">Abrir aplicação</a></p></body></html>',
        "utf8"
      );
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
