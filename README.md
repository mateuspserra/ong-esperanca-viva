# ONG Esperança Viva

Single Page Application (SPA) institucional em HTML5, CSS e JavaScript, organizada com separação de responsabilidades. O projeto demonstra navegação sem recarregamento completo, componentes responsivos, validação de formulários, persistência local e arquitetura modular para uma organização do terceiro setor.

## Tecnologias utilizadas

- HTML5 semântico.
- CSS3 com Design System, Grid de 12 colunas, Flexbox e cinco breakpoints.
- JavaScript ES6+ com Modules, DOM API, eventos e Template Literals.
- Web Storage API (`localStorage`).
- Day.js 1.x carregado via CDN para validação e comparação de datas.
- Git/GitHub com GitFlow, Conventional Commits e Semantic Versioning.

## Estrutura de diretórios

```
/
├── README.md
├── html/
│   └── index.html
├── css/
│   └── estilo.css
├── imagens/
│   ├── logo.png
│   ├── voluntarios.jpg
│   └── voluntarios.webp
└── js/
    ├── app.js
    ├── storage.js
    ├── menu.js
    └── feedback.js
```

## Arquitetura

- `html/index.html`: documento-base da SPA, contendo cabeçalho, navegação, contêiner principal `#app` e rodapé.
- `js/app.js`: roteamento por hash, templates das telas, renderização dinâmica no DOM e restauração da última rota visitada.
- `js/storage.js`: persistência do estado da aplicação com `localStorage`, `JSON.stringify()` e `JSON.parse()`.
- `js/menu.js`: comportamento do menu hamburger e dropdown.
- `js/feedback.js`: inicialização do formulário, toast e modal após cada renderização da rota de cadastro.
- `css/estilo.css`: Design System, Grid de 12 colunas, Flexbox, responsividade, cards e estados interativos.
- `imagens/`: recursos visuais otimizados.

## SPA

A aplicação usa rotas por hash, como:

- `#/inicio`
- `#/projetos`
- `#/projetos/voluntariado`
- `#/projetos/doacoes`
- `#/cadastro`

A troca de rota dispara `hashchange`. A função `renderizar()` interpreta a rota, limpa o contêiner `#app` com `replaceChildren()` e injeta o novo fragmento HTML com `insertAdjacentHTML()`. Dessa forma, o documento não é recarregado a cada navegação.

## Pré-requisitos

- Navegador moderno com suporte a ES6 Modules, `localStorage` e elemento `dialog`.
- Git para clonar e acompanhar o histórico do projeto.
- Python 3 (ou outro servidor HTTP local equivalente) para servir os arquivos.
- Conexão com a internet apenas para carregar o Day.js via CDN; existe fallback nativo para a validação de datas.

## Instalação e execução local

Clone o repositório e entre na pasta do projeto:

```bash
git clone https://github.com/mateuspserra/ong-esperanca-viva.git
cd ong-esperanca-viva
```

Como o projeto utiliza ES6 Modules, não abra o arquivo diretamente com `file://`. Inicie um servidor HTTP na raiz:

```bash
python -m http.server 8000
```

Depois acesse `http://localhost:8000/html/` no navegador.

## Dependências, build e testes

O projeto utiliza **Vite** como bundler de desenvolvimento e produção. Após clonar o repositório, instale a dependência de desenvolvimento com:

```bash
npm install
```

Para desenvolvimento:

```bash
npm run dev
```

Para gerar a build de produção:

```bash
npm run build
```

A saída é criada em `dist/`. O `vite.config.js` define `html/index.html` como entrada, ativa minificação com esbuild para JavaScript e CSS, remove sourcemaps da entrega e gera assets otimizados. O Day.js continua sendo carregado via CDN.

Para validação manual:
1. Abra o Console e o painel Network das DevTools e confirme ausência de erros.
2. Teste as rotas `#/inicio`, `#/projetos` e `#/cadastro`.
3. Verifique menu hamburger/dropdown em larguras diferentes.
4. Teste campos válidos e inválidos do formulário, modal e toast.
5. Recarregue a página para confirmar a restauração de estado pelo `localStorage`.
6. Valide a estrutura HTML no W3C Markup Validation Service.


## Persistência local

O projeto mantém no `localStorage` um objeto de estado com a última rota acessada e preferências não sensíveis do formulário de voluntariado (`estado`, `turno` e `áreas de interesse`). Dados pessoais como CPF, telefone, e-mail, endereço e data de nascimento não são gravados localmente. O objeto é serializado com `JSON.stringify()` e recuperado com `JSON.parse()`.


## Biblioteca externa

A aplicação integra **Day.js** via CDN para manipulação e comparação de datas no formulário de voluntariado. O script é carregado antes dos módulos internos e `js/feedback.js` verifica `window.dayjs` antes de utilizá-lo. A validação da data de nascimento usa `dayjs(valor)`, `.isValid()` e `.isAfter(hoje, "day")`. Existe um fallback com `Date` nativo caso o CDN esteja indisponível, evitando que a aplicação principal deixe de funcionar.


## JavaScript modular

O código usa **ES6 Modules**. O arquivo `js/app.js` é o ponto de entrada carregado com `type="module"` e importa as responsabilidades necessárias:

```javascript
import { inicializarMenu } from "./menu.js";
import { inicializarFeedback, restaurarPreferenciasVoluntariado } from "./feedback.js";
import { lerEstadoApp, salvarEstadoApp } from "./storage.js";
```

- `menu.js` exporta apenas a inicialização e o comportamento da navegação.
- `storage.js` exporta apenas leitura e gravação do estado persistido.
- `feedback.js` importa o armazenamento e exporta validação, feedback e restauração das preferências.
- `app.js` coordena roteamento, templates, renderização e integração entre os módulos.

Essa separação reduz dependências globais e evita misturar navegação, formulário e persistência no mesmo arquivo.


## Registro de validação e depuração

Durante a evolução da SPA foram tratados pontos típicos de depuração: listeners ligados a elementos dinâmicos foram substituídos por event delegation no `#app`; links internos usam `preventDefault()` e roteamento por hash para evitar recarga do documento; leitura e gravação do `localStorage` são protegidas por `try/catch` e estado padrão; a validação de datas testa a disponibilidade do Day.js e possui fallback nativo; e a execução local passou a exigir servidor HTTP por causa dos ES6 Modules.


## Versionamento e fluxo Git

O projeto adota **Semantic Versioning (SemVer)** no formato `MAJOR.MINOR.PATCH`. A primeira versão estável é `1.0.0`, registrada em `VERSION` e `CHANGELOG.md`.

O fluxo segue GitFlow:
- `main`: versões estáveis.
- `develop`: integração das funcionalidades.
- `feature/*`: novas funcionalidades.
- `hotfix/*`: correções urgentes.
- `release/*`: preparação de lançamentos.

As mensagens seguem **Conventional Commits**, usando prefixos como `feat:`, `fix:`, `docs:` e `chore:`. A release `v1.0.0` foi preparada em `release/v1.0.0` e integrada à `main` por pull request.

## Releases e histórico

O arquivo `CHANGELOG.md` registra funcionalidades e correções por versão. O arquivo `VERSION` mantém a versão atual do projeto. Para novas entregas, alterações compatíveis incrementam MINOR, correções incrementam PATCH e mudanças incompatíveis incrementam MAJOR.


## Modos de cor e contraste

A interface oferece três perfis: claro, escuro e alto contraste. A preferência é aplicada com `data-tema` no elemento `<html>`, reutilizando as variáveis do Design System. A escolha é persistida no `localStorage`. Quando ainda não existe preferência salva, `theme.js` consulta `prefers-contrast: more` e `prefers-color-scheme: dark` para respeitar as configurações do sistema.

O modo alto contraste utiliza fundo preto, texto branco, títulos amarelos e foco amarelo/ciano. O projeto também respeita `prefers-reduced-motion` para reduzir transições.


## Build de produção e minificação

O Vite foi configurado em `vite.config.js` com `minify: "esbuild"`, `cssMinify: "esbuild"`, `sourcemap: false` e `outDir: "dist"`. Durante `npm run build`, os módulos ES6 são resolvidos e agrupados, comentários e espaços desnecessários são removidos e os ficheiros CSS/JS são minificados para reduzir a transferência em rede.

A minificação deve ser validada após cada alteração funcional, comparando o comportamento da build com o modo de desenvolvimento, principalmente em rotas SPA, eventos delegados, expressões regulares, Template Literals e importações entre módulos.


## Otimização de imagens

A imagem principal é fornecida em JPEG como fallback e WebP como formato preferencial por meio de `<picture>`. O JPEG possui 15.449 bytes e o WebP 10.278 bytes, uma redução de aproximadamente 33,5% para o mesmo recurso. Com o logo, o payload local de imagens cai de cerca de 16,8 KB para 11,6 KB em navegadores com WebP, redução aproximada de 30,8%.

A marcação utiliza `srcset`, `sizes`, dimensões intrínsecas `width`/`height`, `loading="lazy"` e `decoding="async"`. O CSS mantém `max-width:100%` e `height:auto`, evitando distorções e ajustando a imagem ao viewport.
