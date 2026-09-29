const CHAVE_ESTADO_APP = "ongEsperancaViva:estado";

const ESTADO_PADRAO = {
  ultimaRota: "#/inicio",
  tema: "",
  preferenciasVoluntariado: {
    estado: "",
    turno: "",
    areas: []
  }
};

function clonarEstadoPadrao() {
  return JSON.parse(JSON.stringify(ESTADO_PADRAO));
}

export function lerEstadoApp() {
  try {
    const bruto = localStorage.getItem(CHAVE_ESTADO_APP);

    if (!bruto) {
      return clonarEstadoPadrao();
    }

    const salvo = JSON.parse(bruto);

    return {
      ...clonarEstadoPadrao(),
      ...salvo,
      preferenciasVoluntariado: {
        ...ESTADO_PADRAO.preferenciasVoluntariado,
        ...(salvo.preferenciasVoluntariado || {})
      }
    };
  } catch (erro) {
    console.warn("Não foi possível ler o localStorage.", erro);
    return clonarEstadoPadrao();
  }
}

export function salvarEstadoApp(parcial) {
  try {
    const atual = lerEstadoApp();
    const proximo = {
      ...atual,
      ...parcial,
      preferenciasVoluntariado: {
        ...atual.preferenciasVoluntariado,
        ...(parcial.preferenciasVoluntariado || {})
      }
    };

    localStorage.setItem(CHAVE_ESTADO_APP, JSON.stringify(proximo));
    return proximo;
  } catch (erro) {
    console.warn("Não foi possível gravar no localStorage.", erro);
    return null;
  }
}
