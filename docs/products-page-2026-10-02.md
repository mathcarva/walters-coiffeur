# Walter’s — estudo editorial de produtos (02/10/2026)

Estado: página demonstrativa implementada e verificada localmente; não é catálogo aprovado nem loja.

## Correção de estrutura solicitada em 02/10/2026 — vigente

- Decisão explícita mais recente: `/produtos/` deve conter apenas a área de catálogo. A abertura, a explicação das linhas, o manifesto e o encerramento editorial da versão anterior foram removidos desta rota. A Home já tem uma apresentação editorial de produtos, cujo CTA agora conduz diretamente à grade.
- Alvo conferido: `C:\Users\Mat\Documents\Faya Labs\Fayz\fayz-app\walters-coiffeur`, pacote `@fayz/walters-coiffeur`, sem Git/remote neste diretório, preview `http://127.0.0.1:3014/produtos/`. Só este aplicativo é gravável; SDK publicado e outros projetos permanecem fora do escopo.
- Fonte prioritária: esta correção do usuário > aprovação anterior da grade > identidade de trabalho registrada neste projeto. A regra de uma única seção não altera o DS global.
- Envelope: layout, copy e CSS da rota `/produtos/` **obrigatórios**; rótulo do CTA editorial da Home **permitido**; dados dos 8 produtos, imagens de catálogo, paleta, tipografia, shell, agendamento, demais rotas, SDK e dependências **congelados**.
- No-loss: oito cards e imagens, contagens por categoria, busca, faixa de preço, ordenação, estados de carregamento/erro/vazio, limpar filtros, filtros recolhidos no mobile, rótulos de preço ilustrativo, três selos de conceito, link de Home para catálogo, navegação global e agendamento flutuante. A divulgação da natureza demonstrativa permanece dentro do catálogo, sem seção extra.

| Alvo | Fonte / intenção | Invariantes / variáveis | Seam e responsividade | Evidência | Estado |
| --- | --- | --- | --- | --- | --- |
| Entrada direta no catálogo | Correção explícita do usuário | Um `h1` seguido de filtros e grade; remove seções editoriais, sem tocar nos cards | Componente local `CommercePage`, desktop/tablet/mobile/landscape | Primeira seção da rota e primeira grade alcançável sem narrativa anterior | Verified |
| Funcionalidade dos filtros | Grade aprovada anteriormente | Oito produtos, categorias do SDK, busca, preço e ordenação preservados | `useProducts`/`useCategories`; sidebar desktop e painel mobile | QA interativa nos quatro viewports | Verified |
| Continuidade da Home | Home já possui seção editorial de produtos | Imagens e composição da Home congeladas; CTA passa a descrever o destino real | Link local para `/produtos/` | Navegação e retorno à Home | Verified |

### Registro de implementação

- Removidos da rota: hero fotográfico, introdução, duas seções narrativas de linhas, manifesto e CTA editorial final. Os arquivos de mídia antigos foram preservados para não afetar outros usos; só deixaram de ser carregados nesta página.
- `product-page.css` foi limitado à área de catálogo, com menos espaço antes do primeiro card. O provider demonstrativo e os hooks oficiais do storefront não foram modificados nesta correção.
- Verificação desta correção: `node scripts/check.mjs typecheck` e `build` passaram; `node output/catalog-grid-qa.mjs` passou em 1440×900, 820×1180, 390×844 e 844×390, com exatamente uma seção na rota, oito cards, oito fotos carregadas, filtros/busca/ordenação/estado vazio funcionais, sem erro de página ou overflow. O primeiro card começa em y=428 no desktop e y=656 no mobile; capturas em `output/catalog-page-top-{desktop,tablet,mobile,landscape}.png`. `node scripts/qa-home.mjs` também passou nos viewports e no agendamento global.
- Feedback 02/10/2026: o rótulo acima do título ficava sob o header fixo no mobile/tablet após a primeira redução de padding. Classificação: defeito local de geometria. Correção: padding superior de 96px no mobile e mínimo de 104px nas demais larguras; captura mobile e QA interativa repetidas. Nenhum gap novo de DS ou SDK foi identificado.

## Revisão de catálogo anterior — histórico, estrutura supersedida

- Decisão então aprovada pelo usuário: preservar a abertura editorial e acrescentar uma área mais convencional que mostre todos os produtos, com categorias na lateral, pesquisa, preços e fotos individuais simples. A correção vigente acima supersede apenas a abertura editorial. A imagem anexada é referência de enquadramento; não é um packshot oficial.
- Envelope: layout/estados/copy da seção `#acervo` e dados **exclusivamente demonstrativos** do provider local podem mudar. Hero, narrativas das duas linhas, logo, header, agendamento, rotas e SDK publicado ficam congelados. O eixo de 1380px, paleta, foco visível, responsividade e reduced motion continuam protegidos.
- O site atual não fornece um catálogo autorizado Walter’s. A loja histórica mistura marcas de terceiros e a Home oficial liga para ela; não transportar preços ou fotografias de terceiros para estes conceitos. Os cinco nomes observados em material de 2020 permanecem; três itens adicionais serão marcados como conceitos desta amostra. Todos os preços serão fictícios e exibidos como **ilustrativos**, sem estoque nem checkout.

| Alvo | Fonte / intenção | Invariante e variável | Seam | Evidência requerida | Estado |
| --- | --- | --- | --- | --- | --- |
| Grade de 8 itens | Pedido atual e packshot de referência | Foto simples de um item, nome/preço do provider; grid e card novos | `useProducts` do storefront | 8 imagens carregadas, crop e preço legíveis | Ready |
| Sidebar de categorias | Pedido atual | Filtro funcional e contagem; nomes do provider | `useCategories` do storefront | Todos/Professional/Barbearia, desktop/mobile | Ready |
| Busca, preço e ordenação | Pedido atual | Consulta combinável, estado vazio/limpar, preço fictício rotulado | Estado local sobre produtos do SDK | Busca+categoria+faixa+sort, teclado | Ready |
| Venda real | Catálogo oficial ainda ausente | Sem carrinho, compra ou disponibilidade real | Nenhum endpoint | Avisos visíveis de amostra | Gap — catálogo e preços autorizados |

## Fonte, alvo e fronteira

- Alvo editável: `C:\Users\Mat\Documents\Faya Labs\Fayz\fayz-app\walters-coiffeur`, pacote `@fayz/walters-coiffeur`, Vite em `http://127.0.0.1:3014/`. A pasta não tem repositório Git/remote.
- Prioridade: pedidos recentes do usuário > identidade de trabalho registrada em `docs/home-redesign-2026-10-02.md` > logos oficiais em `public/brand/` > comportamento atual da rota `/produtos/` > propostas locais.
- O documento da Home declara que a direção ainda não é um DS formalmente aprovado. Esta página usa suas regras observadas e as correções explícitas do usuário, mas sua composição específica continua proposta para revisão, não nova regra universal.
- O conteúdo do catálogo vem de `useProducts` e as categorias de `useCategories` (`@fayz-ai/storefront`), alimentados pelo provider demonstrativo de `@fayz-ai/shop`. Não editar pacotes SDK, não expor checkout, preços reais, estoque, disponibilidade ou afirmações de eficácia. A revisão atual permite apenas preços **explicitamente ilustrativos**.

## Baseline e envelope de mudança

- Baseline antes da edição: `/produtos/` continha abertura tipográfica, filtro por linha, busca, grade com cinco itens e seção de contexto. Capturas em `output/products-before-desktop.png` (1440×900) e `output/products-before-mobile.png` (390×844); sem overflow horizontal; cinco itens renderizados.
- Obrigatório no primeiro corte: nova direção fotográfica da página, nova composição editorial, integração preservada com plugins SDK, cinco entradas demonstrativas, filtro, busca, estados de carregamento/erro/vazio, links para unidades e fonte. A revisão acima acrescentou grade de oito itens, categoria, busca, faixa de preço ilustrativo e ordenação.
- Permitido: copy proposta, mídias conceituais locais, layout, CSS e motion de apresentação desta rota.
- Congelado: shell, logo original, header, rodapé, agendamento, rotas vizinhas, contratos públicos do SDK, dados operacionais e comportamento de compra inexistente.
- Protegido: eixo máximo de 1380px, preto/creme com bordô de acento, leitura clara sobre imagem, responsividade, foco visível, reduced motion e identificação discreta do caráter conceitual.

## Matriz de adoção

| Alvo | Fonte e intenção | Invariantes / variáveis | Seam técnico | Responsivo e evidência | Estado |
| --- | --- | --- | --- | --- | --- |
| Hero `/produtos/` | Pedido de página e novas imagens; gramática fotográfica da Home | Headline e mídia propostos; eixo/contraste protegidos | Componente local + asset WebP | Desktop, tablet, mobile e landscape; capturas comparativas | Ready |
| Linhas Professional e Barbearia | Cinco nomes demonstrativos de `src/commerce.ts`; paleta e materiais da identidade de trabalho | Sem prometer fórmula/efeito; composição editorial alterável | Mídias locais e âncoras para catálogo | Imagens sem corte crítico; leitura em todos os viewports | Ready |
| Seletor de produtos inicial | `useProducts` e provider SDK existentes | Cinco itens, filtro, busca, estados e metadados preservados no primeiro corte; substituído pela revisão de grade | `@fayz-ai/storefront` / `@fayz-ai/shop` | Capturas da primeira versão preservadas | Superseded |
| Publicação/venda | Catálogo atual ainda não fornecido | Nenhum preço **real**, estoque ou checkout | Nenhum endpoint novo | Não simular venda | Gap — exige catálogo autorizado |

## Mídia e honestidade

- Imagens novas geradas com a ferramenta integrada de imagem, em oito prompts separados, convertidas mecanicamente para WebP em `public/product-studio-2026/`.
- Três cenas editoriais: hero escuro de dois frascos, par Professional em pedra clara, conjunto de barbearia em pedra escura. Cinco imagens quadradas representam os cinco itens do provider, na mesma família cromática. Os oito arquivos WebP somam aproximadamente 669 KB.
- Os rótulos são visuais conceituais; a marca oficial do site continua a usar os arquivos originais de `public/brand/`. Imagens não são packshots nem prova de um produto à venda.
- Nomes/volumes vêm de material registrado em 2020 no código local. Catálogo, composição, preços e disponibilidade dependem de confirmação antes de publicação comercial.

## Fotos de catálogo da revisão

- Oito novas fotos foram geradas com a ferramenta integrada, usando a imagem de referência enviada pelo usuário como direção de embalagem e enquadramento, não como arquivo a editar. Um produto centralizado por foto, fundo off-white contínuo, sombra suave, sem pessoas, acessórios, cenário editorial ou preço escrito na imagem.
- Os originais PNG gerados ficaram em `C:\Users\Mat\.codex\generated_images\01a07302-9af4-7eb2-9bc2-bcb496f5de7d`. As oito versões finais WebP quadradas de 1000px estão em `public/product-catalog-2026/`; a conversão local está registrada em `output/convert-catalog-images.mjs`. Os arquivos não sobrescrevem `public/product-studio-2026/`.
- Conjunto de prompts (`product-mockup`): shampoo e condicionador Professional em frascos creme com faixa bordô; máscara Professional em pote creme; sérum Professional em frasco âmbar com conta-gotas; cera Barbearia em pote preto; shampoo e condicionador Barbearia em frascos pretos distintos; óleo de barba em frasco âmbar com conta-gotas. Todos pediram apenas o nome curto “Walter’s” no rótulo, luz de estúdio uniforme e nenhum outro texto. O nome do item e o preço são HTML fora da imagem.
- Cinco nomes de produtos mantêm a origem histórica de 2020. Máscara, sérum e óleo de barba são **conceitos novos** para completar a amostra e têm selo próprio na grade. Oito valores foram definidos localmente como dados fictícios de apresentação, nunca como preço publicado pela marca.
- `registerStorefrontBlocks()` registra os loaders oficiais do storefront; sem ele, `useCategories()` ficava vazio embora o provider tivesse duas categorias. A correção foi feita no provider local, sem alterar pacotes SDK.

## Verificação da revisão

- `node output/catalog-grid-qa.mjs` passou em 1440×900, 820×1180, 390×844 e 844×390: oito cards, três opções de categoria (incluindo Todos), oito fotos carregadas, sem erro de página nem overflow horizontal.
- Categoria Professional: 4; Barbearia: 4; busca por “cera”: 1; teto ilustrativo de R$ 70: 2; ordem por menor preço começa pelo óleo de barba; filtros sem resultado mostram estado vazio e Limpar restaura os oito itens.
- No mobile, filtros recolhidos por padrão e acionáveis por botão com `aria-expanded`; a grade aparece logo após a barra de busca/ordenação. Desktop mantém a lista lateral.
- Capturas em `output/catalog-grid-{desktop,tablet,mobile,landscape}.png` e variantes `-full.png`.

## Direção dos prompts gerados

Todos os prompts exigiram fotografia editorial de estúdio, paleta de pedra calcária quente, preto espresso, bordô profundo e rótulo conceitual com a palavra curta “Walter’s”, sem preço, alegações, pessoas, UI ou marca d’água. Variações:

| Asset | Direção específica |
| --- | --- |
| `hero.webp` | Dois frascos com pump em pedra escura, tecido bordô, luz lateral dramática, espaço negativo à esquerda. |
| `professional-story.webp` | Par de frascos em pedra clara, luz natural oblíqua, linguagem serena e tátil. |
| `barber-story.webp` | Trio de embalagens de barbearia em pedra escura e tecido vinho, luz cinematográfica. |
| `professional-shampoo.webp` | Frasco de shampoo individual com pump, composição quadrada sobre calcário claro. |
| `professional-conditioner.webp` | Frasco de condicionador individual da mesma família, enquadramento distinto. |
| `barber-wax.webp` | Pote baixo preto e creme sobre pedra escura e tecido bordô. |
| `barber-shampoo.webp` | Frasco escuro de shampoo de barbearia, still life quadrado. |
| `barber-conditioner.webp` | Frasco escuro de condicionador de barbearia, luz e composição complementares. |

## Verificação realizada

- `node scripts/check.mjs typecheck` e `node scripts/check.mjs build`: passaram.
- Playwright/Chrome em 1440×900, 820×1180, 390×844 e 844×390: sem overflow horizontal, sem erro de página, hero e cenas carregados, cinco imagens individuais carregadas.
- Provider `@fayz-ai/shop` → hook `useProducts` do `@fayz-ai/storefront`: cinco itens; filtro Professional 2, Barbearia 3; busca “cera” 1; estado vazio e limpar filtros; seleção troca imagem/nome.
- Capturas pós-implementação: `output/products-after-{desktop,tablet,mobile,landscape}.png`; capturas de hero, catálogo e seleção em `output/products-*.png`.
- O botão de agendamento permanece no shell compartilhado, ligado ao plugin de agenda; a página não chama fluxo de compra nem simula disponibilidade.
- `prefers-reduced-motion` reduz a animação da imagem para 0,01 ms; a reentrada da rota voltou a renderizar os cinco itens e o Tab a partir da busca alcançou o primeiro produto.
