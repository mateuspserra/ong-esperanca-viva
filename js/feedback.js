const appFeedback = document.querySelector("#app");

let toastTimer;

function mostrarToast() {
  const toast = document.querySelector("#toast-sucesso");
  if (!toast) return;

  clearTimeout(toastTimer);
  toast.classList.add("visivel");
  toast.setAttribute("aria-hidden", "false");

  toastTimer = setTimeout(() => {
    toast.classList.remove("visivel");
    toast.setAttribute("aria-hidden", "true");
  }, 4000);
}

function atualizarEstadoCampo(campo) {
  if (!(campo instanceof HTMLInputElement ||
        campo instanceof HTMLSelectElement ||
        campo instanceof HTMLTextAreaElement)) {
    return;
  }

  if (!campo.closest("#form-voluntario")) return;

  if (campo.validity.valid) {
    campo.setAttribute("aria-invalid", "false");
  } else {
    campo.setAttribute("aria-invalid", "true");
  }
}

/* Event delegation: os elementos do formulário são criados dinamicamente pela SPA. */
appFeedback?.addEventListener("input", (event) => {
  atualizarEstadoCampo(event.target);
});

appFeedback?.addEventListener("change", (event) => {
  atualizarEstadoCampo(event.target);
});

appFeedback?.addEventListener("submit", (event) => {
  const form = event.target.closest("#form-voluntario");
  if (!form) return;

  event.preventDefault();

  if (!form.checkValidity()) {
    form.reportValidity();
    form.querySelector(":invalid")?.focus();
    return;
  }

  mostrarToast();

  const modal = document.querySelector("#modal-sucesso");
  if (modal?.showModal) {
    modal.showModal();
  }
});

appFeedback?.addEventListener("click", (event) => {
  const modal = document.querySelector("#modal-sucesso");

  if (event.target.closest("#fechar-modal")) {
    modal?.close();
    return;
  }

  if (event.target === modal) {
    modal.close();
  }
});
