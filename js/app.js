import { inicializarMenu } from "./menu.js";
import { inicializarFeedback, restaurarPreferenciasVoluntariado } from "./feedback.js";
import { lerEstadoApp, salvarEstadoApp } from "./storage.js";
import { inicializarTema } from "./theme.js";

const app = document.querySelector("#app");

inicializarTema();
inicializarMenu();
inicializarFeedback(app);

const projetosDinamicos = [
  {
    titulo: "Material escolar",
    categoria: "Educação",
    classeBadge: "badge-educacao",
    descricao: "Arrecadamos cadernos, lápis e mochilas para o início do ano letivo."
  },
  {
    titulo: "Cestas básicas",
    categoria: "Doação",
    classeBadge: "badge-doacao",
    descricao: "Alimentos não perecíveis são entregues mensalmente a famílias cadastradas."
  }
];

const estados = [
  ["MA", "Maranhão"],
  ["PA", "Pará"],
  ["PI", "Piauí"],
  ["CE", "Ceará"],
  ["SP", "São Paulo"],
  ["RJ", "Rio de Janeiro"],
  ["OU", "Outro"]
];

const turnos = [
  ["manha", "Manhã"],
  ["tarde", "Tarde"],
  ["noite", "Noite"]
];

const areasInteresse = [
  ["reforco", "Reforço escolar"],
  ["arte", "Arte e cultura"],
  ["eventos", "Eventos"]
];

function gerarCardsProjetos() {
  return projetosDinamicos
    .map((projeto) => `
      <article class="card">
        <span class="badge ${projeto.classeBadge}">${projeto.categoria}</span>
        <h3>${projeto.titulo}</h3>
        <p>${projeto.descricao}</p>
      </article>
    `)
    .join("");
}

function gerarOpcoesSelect(lista) {
  return lista
    .map(([valor, rotulo]) => `<option value="${valor}">${rotulo}</option>`)
    .join("");
}

function gerarOpcoesMarcacao(lista, tipo, nome, obrigatorio = false) {
  return lista
    .map(([valor, rotulo], indice) => `
      <label class="opcao">
        <input type="${tipo}" name="${nome}" value="${valor}" ${obrigatorio && indice === 0 ? "required" : ""}>
        ${rotulo}
      </label>
    `)
    .join("");
}

const paginas = {
  inicio: {
    titulo: "Página inicial | ONG Esperança Viva",
    html: `
      <section id="quem-somos">
        <h2>Quem somos</h2>
        <picture>
          <source srcset="../imagens/voluntarios.webp" type="image/webp">
          <img src="../imagens/voluntarios.jpg" alt="Mãos de pessoas de diferentes tons de pele formando um círculo sobre um gramado, com o céu azul ao fundo" width="320" height="322">
        </picture>
        <p>Somos uma organização sem fins lucrativos que atua desde 2015 apoiando crianças e famílias em situação de vulnerabilidade.</p>
      </section>

      <section id="missao">
        <h2>Missão, visão e valores</h2>
        <h3>Missão</h3>
        <p>Promover acesso à educação e à cidadania.</p>
        <h3>Visão</h3>
        <p>Ser referência em transformação social na comunidade.</p>
        <h3>Valores</h3>
        <p>Respeito, transparência, solidariedade e compromisso.</p>
      </section>

      <section id="contato">
        <h2>Fale conosco</h2>
        <address>
          <p>Endereço: Rua das Flores, 123 - Centro, São Luís - MA</p>
          <p>Telefone: <a href="tel:+559832345678">(98) 3234-5678</a></p>
          <p>E-mail: <a href="mailto:contato@esperancaviva.org">contato@esperancaviva.org</a></p>
          <p>Horário: segunda a sexta, das 8h às 17h</p>
        </address>
      </section>
    `
  },

  projetos: {
    titulo: "Projetos | ONG Esperança Viva",
    html: `
      <section id="apresentacao">
        <h2>Nossos projetos</h2>
        <p>Aqui você conhece as frentes de atuação da ONG e escolhe como participar: como voluntário ou com uma doação.</p>
      </section>

      <section id="voluntariado">
        <h2>Como ser voluntário <span class="badge badge-voluntariado">Voluntariado</span></h2>
        <h3>Áreas de atuação <span class="badge badge-educacao">Educação</span></h3>
        <ul>
          <li>Reforço escolar para crianças</li>
          <li>Oficinas de arte e cultura</li>
          <li>Organização de eventos e arrecadações</li>
        </ul>
      </section>

      <section id="doacoes">
        <h2>Campanhas de doação <span class="badge badge-doacao">Doação</span></h2>
        <div class="alerta alerta-info" role="status" aria-live="polite">
          <strong>Campanha ativa:</strong> estamos recebendo materiais escolares e alimentos não perecíveis.
        </div>

        <div class="cards-projetos">
          ${gerarCardsProjetos()}

          <article class="card card-destaque">
            <h3>Como doar</h3>
            <ol>
              <li>Escolha a campanha que deseja apoiar.</li>
              <li>Faça a transferência com os dados abaixo.</li>
              <li>Envie o comprovante para o e-mail da ONG.</li>
            </ol>
          </article>
        </div>

        <table>
          <caption>Dados para doação</caption>
          <thead>
            <tr><th scope="col">Banco</th><th scope="col">Agência</th><th scope="col">Conta</th><th scope="col">Pix</th></tr>
          </thead>
          <tbody>
            <tr><td>Banco Exemplo</td><td>0001</td><td>12345-6</td><td>contato@esperancaviva.org</td></tr>
          </tbody>
        </table>
      </section>

      <section id="chamada">
        <h2>Faça parte</h2>
        <p>Quer ajudar com seu tempo? Preencha o cadastro de voluntário.</p>
        <a class="botao" href="#/cadastro">Quero ser voluntário</a>
      </section>
    `
  },

  cadastro: {
    titulo: "Cadastro | ONG Esperança Viva",
    html: `
      <section>
        <h2>Cadastro de voluntário</h2>
        <div class="alerta alerta-info" role="status">
          <strong>Antes de enviar:</strong> preencha os campos obrigatórios. Os dados são usados apenas para contato sobre o voluntariado.
        </div>

        <form id="form-voluntario" action="#" method="post">
          <fieldset>
            <legend>Dados pessoais</legend>
            <label for="nome">Nome completo</label>
            <input type="text" id="nome" name="nome" autocomplete="name" required>

            <label for="email">E-mail</label>
            <input type="email" id="email" name="email" autocomplete="email" required>

            <label for="telefone">Telefone</label>
            <input type="tel" id="telefone" name="telefone" pattern="\\(\\d{2}\\) \\d{4,5}-\\d{4}" placeholder="(98) 99999-9999" maxlength="15" title="Formato: (00) 00000-0000" required>

            <label for="nascimento">Data de nascimento</label>
            <input type="date" id="nascimento" name="nascimento" required>

            <label for="cpf">CPF</label>
            <input type="text" id="cpf" name="cpf" pattern="\\d{3}\\.\\d{3}\\.\\d{3}-\\d{2}" placeholder="000.000.000-00" maxlength="14" inputmode="numeric" title="Formato: 000.000.000-00" required>
          </fieldset>

          <fieldset>
            <legend>Endereço</legend>
            <label for="cep">CEP</label>
            <input type="text" id="cep" name="cep" pattern="\\d{5}-\\d{3}" placeholder="00000-000" maxlength="9" inputmode="numeric" title="Formato: 00000-000" required>

            <label for="endereco">Endereço</label>
            <input type="text" id="endereco" name="endereco" autocomplete="street-address" required>

            <label for="cidade">Cidade</label>
            <input type="text" id="cidade" name="cidade" required>

            <label for="estado">Estado</label>
            <select id="estado" name="estado" required>
              <option value="">Selecione</option>
              ${gerarOpcoesSelect(estados)}
            </select>
          </fieldset>

          <fieldset>
            <legend>Interesse no voluntariado</legend>

            <fieldset>
              <legend>Disponibilidade</legend>
              <div class="grupo-opcoes">
                ${gerarOpcoesMarcacao(turnos, "radio", "turno", true)}
              </div>
            </fieldset>

            <fieldset>
              <legend>Áreas de interesse</legend>
              <div class="grupo-opcoes">
                ${gerarOpcoesMarcacao(areasInteresse, "checkbox", "area")}
              </div>
            </fieldset>

            <label for="mensagem">Mensagem</label>
            <textarea id="mensagem" name="mensagem" rows="4" maxlength="500"></textarea>

            <label class="opcao"><input type="checkbox" name="termos" value="aceito" required> Li e aceito os termos de uso dos dados</label>
          </fieldset>

          <button type="submit">Enviar cadastro</button>
        </form>
      </section>

      <div id="toast-sucesso" class="toast toast-sucesso" role="status" aria-live="polite" aria-hidden="true">
        <span class="toast-icone" aria-hidden="true">✓</span>
        <div>
          <strong>Cadastro validado!</strong>
          <p>Os dados foram conferidos com sucesso.</p>
        </div>
      </div>

      <dialog id="modal-sucesso" class="modal-feedback" aria-labelledby="titulo-modal" aria-describedby="descricao-modal">
        <div class="modal-conteudo">
          <span class="badge badge-sucesso">Sucesso</span>
          <h2 id="titulo-modal">Cadastro pronto para envio</h2>
          <p id="descricao-modal">O formulário foi validado no navegador. Em uma integração real, os dados seriam enviados ao back-end neste momento.</p>
          <button id="fechar-modal" type="button">Entendi</button>
        </div>
      </dialog>
    `
  }
};

function interpretarRota() {
  const hash = location.hash || "#/inicio";
  const caminho = hash.replace(/^#\/?/, "").split("/").filter(Boolean);
  const pagina = caminho[0] || "inicio";
  const ancora = caminho[1] || null;

  if (!paginas[pagina]) {
    return { pagina: "inicio", ancora: null };
  }

  return { pagina, ancora };
}

function atualizarNavegacao(pagina) {
  document.querySelectorAll("[data-rota]").forEach((link) => {
    if (link.dataset.rota === pagina) {
      link.setAttribute("aria-current", "page");
    } else {
      link.removeAttribute("aria-current");
    }
  });
}

function renderizar() {
  const { pagina, ancora } = interpretarRota();
  const conteudo = paginas[pagina];

  app.replaceChildren();
  app.insertAdjacentHTML("afterbegin", conteudo.html);

  document.title = conteudo.titulo;
  atualizarNavegacao(pagina);

  salvarEstadoApp({ ultimaRota: location.hash || "#/inicio" });

  if (pagina === "cadastro") {
    restaurarPreferenciasVoluntariado();
  }

  requestAnimationFrame(() => {
    if (ancora) {
      document.getElementById(ancora)?.scrollIntoView({ behavior: "smooth", block: "start" });
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
      app.focus({ preventScroll: true });
    }
  });
}

document.addEventListener("click", (event) => {
  const linkSpa = event.target.closest('a[href^="#/"]');
  if (!linkSpa) return;

  event.preventDefault();

  const destino = linkSpa.getAttribute("href");

  if (location.hash === destino) {
    renderizar();
  } else {
    location.hash = destino;
  }
});

window.addEventListener("hashchange", renderizar);

if (!location.hash) {
  const estadoSalvo = lerEstadoApp();
  const rotaSalva = estadoSalvo?.ultimaRota || "#/inicio";
  location.replace(rotaSalva);
} else {
  renderizar();
}
