# ONG Esperança Viva

Site institucional em HTML5 semântico e CSS, com três páginas.

## Estrutura

```
/
├── index.html      Página inicial (apresentação e contato)
├── projetos.html   Voluntariado, campanhas e dados para doação
├── cadastro.html   Formulário com fieldset, legend e validação nativa
├── css/
│   └── estilo.css
└── img/
    ├── voluntarios.jpg
    ├── voluntarios.webp
    └── logo.png
```

## Recursos aplicados

- Tags semânticas: header, nav, main, section, article, footer, address
- Hierarquia de títulos: um h1 por página, h2 por seção e h3 nas subdivisões
- Imagem com `alt` descritivo e formatos JPG e WebP (`picture`)
- Formulário agrupado com `fieldset` e `legend`, `label` ligado por `for` e `id`
- Validação nativa: `required`, `type` e `pattern` (CPF, telefone e CEP)

## Como visualizar

Abra o `index.html` no navegador.
