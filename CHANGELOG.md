# Changelog

Este projeto adota Semantic Versioning (SemVer) no formato MAJOR.MINOR.PATCH e mensagens no padrão Conventional Commits.

## [1.0.0] - 2026-09-29

### Added
- SPA com roteamento por hash e renderização dinâmica do DOM.
- Design System, CSS Grid de 12 colunas, Flexbox e cinco breakpoints responsivos.
- Menu hamburger, dropdown, cards, badges, alertas, toast e modal.
- Validação de formulários com RegEx e feedback visual.
- Persistência de preferências com localStorage.
- Integração da biblioteca Day.js via CDN.
- Arquitetura JavaScript modular com ES6 import/export.
- Estrutura GitFlow com main, develop, feature, hotfix e release.

### Fixed
- Event listeners de elementos dinâmicos tratados por event delegation.
- Fallback de data quando o CDN do Day.js não está disponível.
- Execução local documentada via servidor HTTP para evitar bloqueios de ES Modules.
