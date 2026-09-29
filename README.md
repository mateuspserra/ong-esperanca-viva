# ONG Esperança Viva

Single Page Application (SPA) institucional em HTML5, CSS e JavaScript, organizada com separação de responsabilidades.

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

## Como visualizar

Abra `html/index.html` no navegador.


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
