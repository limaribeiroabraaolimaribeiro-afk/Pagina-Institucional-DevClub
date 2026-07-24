# DevClub — Página Institucional

Landing page institucional do DevClub: hero cinematográfico, storytelling da jornada do aluno, prova social, formações, projetos, depoimentos, tutores e FAQ — construída como SPA estática (sem backend), pronta para deploy em Vercel, Netlify, Cloudflare Pages ou GitHub Pages.

## Instalação

Pré-requisito: Node.js 20+.

```bash
npm install
```

## Executar em desenvolvimento

```bash
npm run dev
```

Abre em `http://localhost:5173`.

## Build de produção

```bash
npm run build
```

Gera os arquivos estáticos em `dist/`. O comando roda `tsc -b` (typecheck) antes do `vite build`, então o build falha se houver erro de tipos.

Outros comandos úteis:

```bash
npm run typecheck   # apenas checagem de tipos
npm run lint        # oxlint
npm run preview     # serve o build de dist/ localmente
```

## Stack e por que cada peça está aqui

| Ferramenta | Uso | Motivo |
|---|---|---|
| **React 19 + TypeScript** | UI e tipagem | Componentização e segurança de tipos em todo o projeto. |
| **Vite** | build/dev server | Build rápido, sem acoplamento a um framework de servidor (ao contrário do Next.js), o que mantém o deploy simples como site estático. |
| **Tailwind CSS v4** | estilos | Design system via `@theme` em CSS (`src/styles/globals.css`), sem arquivo de config JS. Tokens de cor/fonte centralizados. |
| **Framer Motion** | animações de entrada, hover, layout (accordion, menu, modal) | API declarativa (`whileInView`, `AnimatePresence`) ideal para microinterações de UI. |
| **GSAP + ScrollTrigger** | headline do Hero (stagger por palavra) e a timeline da Jornada do Aluno | Controle fino de timelines e scroll-linked animation (`scrub`), que a API do Framer Motion não cobre tão bem. |
| **Lenis** | scroll suave | Sincronizado com o `ScrollTrigger` do GSAP via `gsap.ticker`, para que animações de scroll fiquem consistentes. |
| **lucide-react** | ícones de interface (setas, badges, UI genérica) | Biblioteca de ícones leve, tree-shakeable. Ícones de marca (GitHub/LinkedIn/Instagram/YouTube) não existem mais no pacote (foram removidos por questão de marca registrada), então há um pequeno conjunto de SVGs próprios em `src/components/ui/SocialIcons.tsx`. |
| ~~simple-icons~~ (não instalado) | fonte dos logos reais da seção "Tecnologias" | Instalado uma única vez, localmente, só para extrair o `path` SVG + cor oficial de ~20 das 25 tecnologias (JavaScript, React, Node.js, Python, Docker, etc.), que foram colados como string direto em `src/data/technologies.ts` (renderizados por `src/components/ui/TechIcon.tsx`) — depois **desinstalado**, então não é dependência do projeto nem entra no bundle. Escolhida por ser puro dado SVG (MIT, sem runtime JS/componente pesado). As 4 tecnologias sem logo público nesse pacote (AWS, Power BI, SQL, "Inteligência Artificial" — não são marcas com asset ali) usam um badge de monograma na cor oficial, em vez de ícone genérico. Para adicionar/atualizar um logo: `npm i -D simple-icons`, copiar o `path` de `node_modules/simple-icons/icons/<slug>.svg`, colar em `technologies.ts`, desinstalar de novo. |
| **clsx** | composição de classes condicionais | Evita concatenação manual de strings de className. |

Não há backend, chamadas de API ou dependência de servidor — é um site 100% estático.

## Estrutura de pastas

```
src/
├── components/
│   ├── layout/     Header, Footer
│   ├── sections/   as 13 seções da página (Hero, Courses, FAQ, etc.)
│   ├── effects/    HeroParticles (canvas), CursorGlow, AnimatedGrid
│   └── ui/         Button, SectionTitle, GlowCard, AnimatedCounter, SocialIcons
├── data/           conteúdo estático tipado (courses, companies, projects, testimonials, tutors, faq, ...)
├── hooks/          useReducedMotion, useMediaQuery
├── styles/         globals.css (Tailwind + design tokens)
└── App.tsx         composição das seções + setup do Lenis/ScrollTrigger
```

Cada seção é um componente isolado; nenhum dado estático fica hardcoded dentro de JSX — tudo vem de `src/data/*.ts` tipado.

## Organização das imagens

As imagens originais (`img/*.png`, com espaços/acentos no nome) foram renomeadas e organizadas por conteúdo visual em `public/img/`:

```
public/img/
├── brand/devclub-logo.png            (logo.png)
├── hero/hero-reference.png           (hero-reference.png)
├── companies/{google,microsoft,amazon,ifood,stone,nubank,quinto-andar,99,ambev,apple}.png
├── testimonials/testimonial-video.png (card dos videos.png — aluno com headset)
├── projects/projects-preview.png      (depoimentos.png — ícone </> quadrado, usado como marca d'água decorativa nos cards de projeto)
└── cta/final-cta.png                  (foto quero ser aluno agora.png — símbolo </> retangular do CTA final)
```

Os dois arquivos com o símbolo `</>` foram identificados pelo conteúdo visual (não pelo nome do arquivo, que estava trocado) e distribuídos para as seções onde fazem sentido: o card retangular no CTA final, o ícone quadrado como elemento decorativo nos cards de Projetos.

## Como funciona o Hero

O Hero (`src/components/sections/Hero.tsx` + `src/components/effects/HeroParticles.tsx`) combina camadas:

1. **Canvas de partículas** (`HeroParticles`) — partículas verdes/roxas com movimento próprio, linhas de conexão entre partículas próximas, e repulsão suave ao redor do cursor. Roda em `requestAnimationFrame` e é totalmente desmontado/limpo no `useEffect` de cleanup.
2. **Imagem de referência** (`hero-reference.png`, vórtice + personagem + logo) sobreposta com `mix-blend-screen`, o que remove o fundo preto da imagem e deixa apenas o brilho do vórtice e a silhueta integrados ao fundo — não é uma foto estática "colada", ela se funde com o canvas de partículas atrás dela.
3. **Parallax por mouse** — a camada da imagem se desloca sutilmente com a posição do cursor (Framer Motion `useMotionValue` + `useSpring`), dando profundidade sem custo de reflow (`transform` apenas).
4. **Códigos flutuantes** — `<span>` com trechos de código, animação CSS (`animate-float`), visíveis só em telas ≥ `lg`.
5. **Headline animada por palavra** — GSAP anima cada palavra do H1 com `fromTo` + `stagger`, disparado uma vez no mount (`useLayoutEffect`).

### Modo leve / degradação

- `prefers-reduced-motion: reduce` → o canvas não desenha partículas nem escuta o mouse; a headline aparece direto no estado final (sem stagger do GSAP).
- Telas `≤ 767px` **ou** `navigator.hardwareConcurrency ≤ 4` → menos partículas (45 em vez de 110) e as linhas de conexão entre partículas são desativadas, mantendo o efeito leve em aparelhos mais fracos.

## Animações e microinterações

- **Scroll reveal**: `whileInView` do Framer Motion em praticamente todas as seções (`viewport={{ once: true }}` — anima uma vez, não repete ao rolar para cima e para baixo).
- **Jornada do Aluno** (`StudentJourney.tsx`): usa GSAP `ScrollTrigger` com `scrub` para uma barra de progresso vertical e o glow de fundo, e um `ScrollTrigger` por etapa (`toggleActions`) para acender cada ponto da timeline. Deliberadamente **sem pin** da seção — a instrução do briefing pedia para evitar animações que "prendam" o scroll por muito tempo.
- **Cursor glow** (`CursorGlow.tsx`): gradiente radial fixo que segue o mouse com spring, desativado em touch (`pointer: coarse`) e com `prefers-reduced-motion`.
- **Carrosséis** (Formações, Tutores): scroll horizontal nativo com `snap-x`, arraste com o mouse no desktop via handlers de `mousedown/mousemove`, e scroll por toque nativo no mobile — sem biblioteca de carrossel extra.
- **FAQ**: accordion com `aria-expanded`, `aria-controls`, navegação por seta/Home/End entre perguntas, animação de altura via `AnimatePresence`.
- **Botões**: efeito magnético sutil (desloca o botão em direção ao cursor via CSS custom properties) e seta que se move no hover.

Todas as animações usam `transform`/`opacity` (evitando propriedades que disparam layout/reflow).

## Responsividade

Testada visualmente em 375/390/768/1024/1440px (ver `README` não impede testes adicionais em 320/430/1280/1920, que seguem a mesma escala fluida do Tailwind). Abordagem:

- Grids que colapsam de `lg:grid-cols-N` para 1–2 colunas em mobile.
- Carrosséis (Formações, Tutores) viram scroll nativo com snap em telas pequenas.
- Header vira menu lateral animado abaixo de `lg`.
- Hero mantém impacto visual em mobile com uma versão mais leve do canvas de partículas.
- Nenhum uso de larguras fixas em `px` para containers — tudo em `max-w-*` + padding fluido.

## `prefers-reduced-motion`

Tratado em duas camadas:

1. **Global** (`globals.css`): media query que zera durações de transição/animação para qualquer elemento que não tenha sido explicitamente tratado em JS.
2. **Por componente** (`useReducedMotion` hook, baseado em `matchMedia`): usado no Hero, `HeroParticles`, `CursorGlow`, `StudentJourney` e `AnimatedCounter` para pular a animação e ir direto ao estado final (sem sumir conteúdo, sem quebrar a página — só sem o movimento).

## Deploy

O projeto é uma SPA estática comum (Vite). Após `npm run build`, publique a pasta `dist/`:

- **Vercel**: framework preset "Vite", build command `npm run build`, output `dist`.
- **Netlify**: build command `npm run build`, publish directory `dist`.
- **Cloudflare Pages**: build command `npm run build`, output directory `dist`.
- **GitHub Pages**: ver seção dedicada abaixo.

## Publicar no GitHub Pages

O deploy é automático via GitHub Actions (`.github/workflows/deploy-pages.yml`): a cada push em `main`, o workflow instala dependências, roda `typecheck`, `lint` e `build`, e publica o conteúdo de `dist/` no GitHub Pages. Não usa a branch `gh-pages`, o pacote `gh-pages` nem deploy manual — é o método oficial "Deploy from GitHub Actions".

### Requisitos

- Node.js 20+ e npm.
- Uma conta no GitHub e um repositório (pode ser criado do zero ou já existir).

### 1. Instalação e execução local

```bash
npm install
npm run dev       # http://localhost:5173
```

### 2. Build e preview de produção

```bash
npm run build      # gera dist/
npm run preview    # serve dist/ localmente, simulando produção
```

### 3. `base` do Vite

O `vite.config.ts` já está configurado com o `base` correto para este repositório:

```ts
base: '/Pagina-Institucional-DevClub/',
```

Se algum dia o projeto for publicado em outro repositório, ajuste esse valor:

- repositório comum → `base: '/NOME-EXATO-DO-REPOSITORIO/'`
- repositório `SEU-USUARIO.github.io` → `base: '/'`

Todas as imagens (`<img src>`) usam o helper `src/lib/assetUrl.ts`, que prefixa o caminho com `import.meta.env.BASE_URL` — por isso não é necessário caçar caminhos quebrados ao trocar o `base`.

### 4. Criar o repositório e configurar o remote

> Este projeto **já tem um remote configurado** (ver abaixo), então pule para o passo 5.

Para um projeto novo, do zero:

```bash
git init
git add .
git commit -m "Publica página institucional DevClub"
git branch -M main
git remote add origin https://github.com/SEU-USUARIO/NOME-DO-REPOSITORIO.git
git push -u origin main
```

### 5. Remote atual deste projeto

```
origin  https://github.com/limaribeiroabraaolimaribeiro-afk/Pagina-Institucional-DevClub.git
branch: main (já rastreando origin/main)
```

Como o remote já existe e a branch já está configurada, para publicar as alterações preparadas nesta tarefa basta:

```bash
git add .
git commit -m "Prepara projeto para publicação no GitHub Pages"
git push
```

### 6. Ativar o GitHub Pages

No repositório, no GitHub:

1. **Settings** → **Pages**
2. Em **Build and deployment** → **Source**, selecione **GitHub Actions**
3. Faça (ou aguarde) um push em `main` — o workflow `Deploy GitHub Pages` roda automaticamente e publica o site
4. Acompanhe o progresso em **Actions**; ao final, a URL publicada aparece em **Settings → Pages**

### 7. URL esperada

```
https://limaribeiroabraaolimaribeiro-afk.github.io/Pagina-Institucional-DevClub/
```

### Rotas internas

O site é uma SPA de página única: os links do menu e dos botões (`#formacoes`, `#projetos`, `#tutores`, `#quero-ser-aluno`, ...) são âncoras internas da mesma página, não rotas de um router. Isso significa que não há risco de 404 ao atualizar a página (refresh) em nenhuma URL do site — não é necessário `HashRouter` nem configuração especial de SPA fallback.

## Pontos que dependem de conteúdo real

- **Fotos dos tutores**: não havia fotos reais fornecidas — os cards usam iniciais sobre gradiente. Trocar por fotos reais em `src/data/tutors.ts` (adicionar um campo `photo` e usar `<img>` no lugar do texto de iniciais em `Tutors.tsx`).
- **Vídeo de depoimento**: o modal de vídeo é um placeholder (não há vídeo real embedado); a thumbnail é real (`testimonial-video.png`), mas o player abre uma mensagem de demonstração.
- **Links do menu, redes sociais, newsletter e botões de CTA**: apontam para âncoras internas ou `#` — não há páginas de destino (Formações, Faculdade, Planos etc.) além da própria landing.
- **Preview de projetos**: os cards de projeto usam um ícone decorativo genérico (`projects-preview.png`), não screenshots reais de cada aplicação — não havia imagens individuais por projeto.
