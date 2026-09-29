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
    ├── menu.js
    └── feedback.js
```

## Arquitetura

- `html/index.html`: documento-base da SPA, contendo cabeçalho, navegação, contêiner principal `#app` e rodapé.
- `js/app.js`: roteamento por hash, templates das telas e renderização dinâmica no DOM.
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
