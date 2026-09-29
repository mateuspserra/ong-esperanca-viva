const appFeedback = document.querySelector("#app");

let toastTimer;


function coletarPreferenciasVoluntariado(form) {
  return {
    estado: form.querySelector('[name="estado"]')?.value || "",
    turno: form.querySelector('[name="turno"]:checked')?.value || "",
    areas: [...form.querySelectorAll('[name="area"]:checked')].map((item) => item.value)
  };
}

function salvarPreferenciasVoluntariado(form) {
  if (!form) return;

  window.storageApp?.salvar({
    preferenciasVoluntariado: coletarPreferenciasVoluntariado(form)
  });
}

window.restaurarPreferenciasVoluntariado = function restaurarPreferenciasVoluntariado() {
  const form = document.querySelector("#form-voluntario");
  if (!form) return;

  const estado = window.storageApp?.ler();
  const preferencias = estado?.preferenciasVoluntariado;
  if (!preferencias) return;

  const campoEstado = form.querySelector('[name="estado"]');
  if (campoEstado) {
    campoEstado.value = preferencias.estado || "";
  }

  if (preferencias.turno) {
    form.querySelector(`[name="turno"][value="${preferencias.turno}"]`)?.click();
  }

  const areasSalvas = Array.isArray(preferencias.areas) ? preferencias.areas : [];
  form.querySelectorAll('[name="area"]').forEach((campo) => {
    campo.checked = areasSalvas.includes(campo.value);
  });
};

const regras = {
  nome: {
    regex: /^[A-Za-zÀ-ÿ'’-]+(?:\s+[A-Za-zÀ-ÿ'’-]+)+$/,
    vazio: "Informe seu nome completo.",
    invalido: "Digite nome e sobrenome usando apenas letras."
  },
  email: {
    regex: /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/,
    vazio: "Informe um e-mail para contato.",
    invalido: "Digite um e-mail válido, por exemplo nome@dominio.com."
  },
  telefone: {
    regex: /^\(\d{2}\) \d{4,5}-\d{4}$/,
    vazio: "Informe um telefone para contato.",
    invalido: "Use o formato (00) 00000-0000."
  },
  cpf: {
    regex: /^\d{3}\.\d{3}\.\d{3}-\d{2}$/,
    vazio: "Informe o CPF.",
    invalido: "Use o formato 000.000.000-00."
  },
  cep: {
    regex: /^\d{5}-\d{3}$/,
    vazio: "Informe o CEP.",
    invalido: "Use o formato 00000-000."
  },
  endereco: {
    teste: (valor) => valor.trim().length >= 5,
    vazio: "Informe o endereço.",
    invalido: "Digite um endereço com pelo menos 5 caracteres."
  },
  cidade: {
    regex: /^[A-Za-zÀ-ÿ'’ -]{2,}$/,
    vazio: "Informe a cidade.",
    invalido: "Digite um nome de cidade válido."
  }
};

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

function obterAlvoMensagem(campo) {
  if (campo.type === "radio") {
    return campo.closest(".grupo-opcoes");
  }

  if (campo.type === "checkbox") {
    return campo.closest("label") || campo;
  }

  return campo;
}

function obterOuCriarMensagem(campo) {
  const chave = campo.type === "radio" ? campo.name : (campo.id || campo.name);
  const id = `erro-${chave}`;
  let mensagem = document.getElementById(id);

  if (!mensagem) {
    mensagem = document.createElement("small");
    mensagem.id = id;
    mensagem.className = "mensagem-campo";
    mensagem.setAttribute("role", "alert");
    mensagem.setAttribute("aria-live", "polite");
    obterAlvoMensagem(campo)?.insertAdjacentElement("afterend", mensagem);
  }

  campo.setAttribute("aria-describedby", id);
  return mensagem;
}

function resultadoValidacao(campo) {
  const valor = typeof campo.value === "string" ? campo.value.trim() : "";

  if (campo.type === "radio") {
    const grupo = campo.form?.querySelectorAll(`input[name="${campo.name}"]`) || [];
    const marcado = [...grupo].some((item) => item.checked);
    return marcado
      ? { valido: true, mensagem: "" }
      : { valido: false, mensagem: "Selecione um período de disponibilidade." };
  }

  if (campo.type === "checkbox" && campo.name === "termos") {
    return campo.checked
      ? { valido: true, mensagem: "" }
      : { valido: false, mensagem: "É necessário aceitar os termos para continuar." };
  }

  if (campo.tagName === "SELECT" && campo.required && !valor) {
    return { valido: false, mensagem: "Selecione uma opção." };
  }

  if (campo.name === "nascimento") {
    if (!valor) {
      return { valido: false, mensagem: "Informe a data de nascimento." };
    }

    const data = new Date(`${valor}T00:00:00`);
    const hoje = new Date();
    hoje.setHours(0, 0, 0, 0);

    return data <= hoje
      ? { valido: true, mensagem: "" }
      : { valido: false, mensagem: "A data de nascimento não pode estar no futuro." };
  }

  if (campo.required && !valor) {
    const regra = regras[campo.name];
    return { valido: false, mensagem: regra?.vazio || "Preencha este campo obrigatório." };
  }

  const regra = regras[campo.name];
  if (regra && valor) {
    const valido = regra.regex ? regra.regex.test(valor) : regra.teste(valor);
    if (!valido) {
      return { valido: false, mensagem: regra.invalido };
    }
  }

  if (!campo.validity.valid) {
    return { valido: false, mensagem: campo.validationMessage || "Verifique o valor informado." };
  }

  return { valido: true, mensagem: "" };
}

function aplicarEstado(campo, resultado) {
  const mensagem = obterOuCriarMensagem(campo);
  campo.classList.toggle("campo-valido", resultado.valido);
  campo.classList.toggle("campo-invalido", !resultado.valido);
  campo.setAttribute("aria-invalid", String(!resultado.valido));

  if (campo.type === "radio") {
    const grupo = campo.form?.querySelectorAll(`input[name="${campo.name}"]`) || [];
    grupo.forEach((item) => {
      item.classList.toggle("campo-valido", resultado.valido);
      item.classList.toggle("campo-invalido", !resultado.valido);
      item.setAttribute("aria-invalid", String(!resultado.valido));
      item.setAttribute("aria-describedby", mensagem.id);
    });
  }

  mensagem.textContent = resultado.mensagem;
  mensagem.classList.toggle("mensagem-erro", !resultado.valido);
  mensagem.classList.toggle("mensagem-sucesso", resultado.valido);

  if (resultado.valido && campo.required && campo.type !== "radio" && campo.type !== "checkbox") {
    mensagem.textContent = "Preenchimento válido.";
  }
}

function validarCampo(campo) {
  if (!(campo instanceof HTMLInputElement ||
        campo instanceof HTMLSelectElement ||
        campo instanceof HTMLTextAreaElement)) {
    return true;
  }

  if (!campo.closest("#form-voluntario")) return true;
  if (campo.type === "checkbox" && campo.name === "area") return true;

  const resultado = resultadoValidacao(campo);
  aplicarEstado(campo, resultado);
  return resultado.valido;
}

function validarFormulario(form) {
  const campos = [...form.querySelectorAll("input, select, textarea")];
  const nomesRadioValidados = new Set();
  let primeiroInvalido = null;
  let valido = true;

  campos.forEach((campo) => {
    if (campo.type === "checkbox" && campo.name === "area") return;

    if (campo.type === "radio") {
      if (nomesRadioValidados.has(campo.name)) return;
      nomesRadioValidados.add(campo.name);
    }

    const campoValido = validarCampo(campo);
    if (!campoValido) {
      valido = false;
      primeiroInvalido ||= campo;
    }
  });

  primeiroInvalido?.focus();
  return valido;
}

/* Event delegation: os campos são criados dinamicamente pela SPA. */
appFeedback?.addEventListener("input", (event) => {
  validarCampo(event.target);

  const form = event.target.closest("#form-voluntario");
  if (form && ["estado", "turno", "area"].includes(event.target.name)) {
    salvarPreferenciasVoluntariado(form);
  }
});

appFeedback?.addEventListener("change", (event) => {
  validarCampo(event.target);

  const form = event.target.closest("#form-voluntario");
  if (form && ["estado", "turno", "area"].includes(event.target.name)) {
    salvarPreferenciasVoluntariado(form);
  }
});

appFeedback?.addEventListener("focusout", (event) => {
  validarCampo(event.target);
});

appFeedback?.addEventListener("submit", (event) => {
  const form = event.target.closest("#form-voluntario");
  if (!form) return;

  event.preventDefault();

  if (!validarFormulario(form)) {
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
