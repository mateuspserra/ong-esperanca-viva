const formVoluntario = document.querySelector("#form-voluntario");
const toastSucesso = document.querySelector("#toast-sucesso");
const modalSucesso = document.querySelector("#modal-sucesso");
const fecharModal = document.querySelector("#fechar-modal");

let toastTimer;

function mostrarToast() {
  if (!toastSucesso) return;
  clearTimeout(toastTimer);
  toastSucesso.classList.add("visivel");
  toastSucesso.setAttribute("aria-hidden", "false");

  toastTimer = setTimeout(() => {
    toastSucesso.classList.remove("visivel");
    toastSucesso.setAttribute("aria-hidden", "true");
  }, 4000);
}

formVoluntario?.addEventListener("submit", (event) => {
  event.preventDefault();

  if (!formVoluntario.checkValidity()) {
    formVoluntario.reportValidity();
    return;
  }

  mostrarToast();

  if (modalSucesso?.showModal) {
    modalSucesso.showModal();
  }
});

fecharModal?.addEventListener("click", () => {
  modalSucesso?.close();
});

modalSucesso?.addEventListener("click", (event) => {
  if (event.target === modalSucesso) {
    modalSucesso.close();
  }
});
