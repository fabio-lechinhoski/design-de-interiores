# Fábio Lechinhoski — Design de Interiores & Visualização 3D

Portfólio oficial de **Fábio Lechinhoski**, apresentando projetos de design de interiores residenciais e corporativos, além de soluções de **Render Fotorrealista** e **Sites Portfólio para Arquitetos e Designers**.

🔗 **Acesse o site online:** [fabio-lechinhoski.github.io/design-de-interiores](https://fabio-lechinhoski.github.io/design-de-interiores/)

---

## ✨ Visão Geral

O projeto foi desenvolvido com foco em **performance**, **minimalismo arquitetônico** e **experiência mobile**, utilizando tecnologias nativas (HTML5 semântico, CSS3 moderno e JavaScript Vanilla) para garantir carregamento instantâneo no GitHub Pages.

### Principais Funcionalidades
- **Hero Editorial de Alto Impacto:** Apresentação visual com destaque de projeto e chamadas para ação (CTAs) diretas.
- **Filtro e Navegação Rápida de Projetos:** Barra *sticky* em `projetos.html` com filtro por categoria (*Todos*, *Residencial*, *Corporativo*), contadores automáticos e índice de salto rápido com *scrollspy*.
- **Sistema de Grid Flexível:** Regras inteligentes em CSS Grid para galerias de `1`, `2`, `3`, `4` ou `5+` fotos (incluindo suporte a renders verticais e horizontais sem espaços vazios).
- **Lightbox Completo por Projeto:** Visualizador de imagens com navegação (*Anterior / Próxima*), suporte a teclado (`←`, `→`, `Esc`), gestos de *swipe* em dispositivos móveis, legendas dinâmicas e contador de slides.
- **Imagens Otimizadas (`.webp`):** Todos os renders em alta definição convertidos para WebP para máxima nitidez com baixo consumo de dados.
- **Formulário de Contato Integrado:** Envio direto de mensagens com máscara automática de telefone, *fallback* inteligente para cliente de e-mail e atalho para atendimento via WhatsApp.
- **SEO & Compartilhamento Social:** Meta tags Open Graph (`og:image`, `og:title`, `og:description`) e Favicon em SVG vetorial.

---

## 🎨 Identidade Visual (*Architectural Warm Stone*)

| Elemento | Especificação |
| :--- | :--- |
| **Superfície Principal** | Alabastro (`#FAF9F6`) & Branco Puro (`#FFFFFF`) |
| **Superfície Secundária** | Pedra Calcária / Limestone (`#F2EFE9`) |
| **Cor Primária** | Preto Carvão Arquitetônico (`#141413`) |
| **Cor de Acento** | Bronze Arquitetônico (`#8C7355`) |
| **Tipografia de Títulos** | [Outfit](https://fonts.google.com/specimen/Outfit) (Google Fonts) |
| **Tipografia de Corpo / UI** | [Plus Jakarta Sans](https://fonts.google.com/specimen/Plus+Jakarta+Sans) (Google Fonts) |

---

## 📂 Estrutura de Arquivos

```text
design-de-interiores/
└── docs/
    ├── index.html        # Página inicial (Hero editorial, vitrine de projetos e resumo)
    ├── sobre.html        # Apresentação profissional, 8 etapas do projeto e parcerias B2B
    ├── projetos.html     # Portfólio completo com filtros, índice rápido e galerias
    ├── solucoes.html     # Serviços de interiores e soluções para Arquitetos/Designers
    ├── contato.html      # Canais de atendimento e formulário funcional
    ├── style.css         # Design System, variáveis, grids responsivos e animações
    ├── script.js         # Menu mobile, filtros dinâmicos, scrollspy, lightbox e formulário
    ├── favicon.svg       # Ícone vetorial com monograma FL
    └── images/           # Renders e fotografias otimizados em formato .webp
```

---

## 🏛️ Projetos no Portfólio

1. **Escritório de Advocacia** *(Corporativo)* — Sala de atendimento e sala de reuniões.
2. **Casa Serena** *(Residencial)* — Fachada diurna/noturna e lavabo.
3. **Casa Aura** *(Residencial)* — Cozinha, sala de estar e quarto.
4. **Suíte Grafite** *(Residencial)* — Suíte com marcenaria iluminada e tons sóbrios.

---

## ➕ Como Adicionar Novos Projetos

Em `docs/projetos.html`, basta inserir uma nova `<section class="section project-detail-section">`. O script se encarrega de atualizar os contadores de categoria, criar o botão na barra de navegação rápida e alternar a cor de fundo automaticamente:

```html
<section class="section project-detail-section" id="id-do-projeto" data-category="residencial" data-title="Nome do Projeto">
  <div class="container">
    <div class="project-detail-header">
      <div class="project-header-title">
        <span class="section-kicker">Residencial</span>
        <h2>Nome do Projeto</h2>
      </div>
      <div class="project-header-body">
        <p class="project-description">Descrição breve sobre a proposta e atmosfera do projeto.</p>
        <ul class="project-meta" aria-label="Ficha rápida do projeto">
          <li><strong>Tipologia</strong> Residencial</li>
          <li><strong>Ambientes</strong> Sala &amp; Cozinha</li>
          <li><strong>Proposta</strong> Elegância &amp; Conforto</li>
        </ul>
      </div>
    </div>

    <!-- Opções de grid: .gallery-grid-1, .gallery-grid-2, .gallery-grid-3, .gallery-grid-4, .gallery-grid-5, .gallery-grid-featured -->
    <!-- Adicione .gallery-grid-portrait quando as imagens forem verticais -->
    <div class="gallery-grid gallery-grid-2">
      <article class="gallery-card image-only-card">
        <img src="images/foto-01.webp" alt="Descrição da imagem" loading="lazy" />
      </article>
      <article class="gallery-card image-only-card">
        <img src="images/foto-02.webp" alt="Descrição da imagem" loading="lazy" />
      </article>
    </div>
  </div>
</section>
```

---

## 📬 Contato

- **Portfólio:** [fabio-lechinhoski.github.io/design-de-interiores](https://fabio-lechinhoski.github.io/design-de-interiores/)
- **Instagram:** [@fabio.le.interiores](https://www.instagram.com/fabio.le.interiores/)
- **WhatsApp:** [Iniciar conversa](https://bit.ly/3cHmS3p)
- **E-mail:** [fabio.lechinhoski@gmail.com](mailto:fabio.lechinhoski@gmail.com)

---

© 2026 Fábio Lechinhoski. Todos os direitos reservados.
