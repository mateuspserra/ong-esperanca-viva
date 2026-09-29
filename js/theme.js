import { lerEstadoApp, salvarEstadoApp } from "./storage.js";

const TEMAS = new Set(["claro", "escuro", "alto-contraste"]);

function detectarTemaSistema() {
  if (window.matchMedia("(prefers-contrast: more)").matches) {
    return "alto-contraste";
  }

  if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
    return "escuro";
  }

  return "claro";
}

export function aplicarTema(tema) {
  const temaSeguro = TEMAS.has(tema) ? tema : detectarTemaSistema();
  document.documentElement.dataset.tema = temaSeguro;

  document.querySelectorAll("[data-tema]").forEach((botao) => {
    botao.setAttribute("aria-pressed", String(botao.dataset.tema === temaSeguro));
  });

  return temaSeguro;
}

export function inicializarTema() {
  const estado = lerEstadoApp();
  const temaInicial = aplicarTema(estado.tema);

  document.querySelector(".tema-controles")?.addEventListener("click", (event) => {
    const botao = event.target.closest("[data-tema]");
    if (!botao) return;

    const tema = aplicarTema(botao.dataset.tema);
    salvarEstadoApp({ tema });
  });

  return temaInicial;
}
