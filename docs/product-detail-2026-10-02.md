# Walter’s — detalhe de produto demonstrativo (02/10/2026)

Estado: implementado e verificado localmente. Esta é uma amostra visual; não é loja nem catálogo comercial confirmado.

## Fonte, alvo e limite

- Decisão vigente do usuário: a lista em `/produtos/` deve abrir uma página específica por produto, com descrição, preço e variações de tamanho. A lista continua sendo apenas catálogo, sem narrativas editoriais anteriores.
- Alvo: `C:\Users\Mat\Documents\Faya Labs\Fayz\fayz-app\walters-coiffeur`, pacote `@fayz/walters-coiffeur`, Vite local em `http://127.0.0.1:3014/`. Não existe Git/remote no alvo. São graváveis os arquivos deste aplicativo; SDK instalado, demais projetos e dados reais ficam fora do escopo.
- Prioridade: pedido atual > decisões em `docs/products-page-2026-10-02.md` > identidade de trabalho em `docs/home-redesign-2026-10-02.md` > comportamento observado em `/produtos/`. O DS ainda não foi formalmente aprovado; esta página aplica a linguagem já aceita no projeto sem promovê-la a regra global.
- Contrato técnico: React Router 7, `@fayz-ai/shop@0.33.0`, `@fayz-ai/storefront@0.33.0`, `@fayz-ai/sdk@0.19.1`; `useProduct(slug)` obtém `Product` por loader do SDK, com `options` e `variants` do provider; `getProductOptionGroups` e `selectionPrice` interpretam a seleção. O provider mock admite `ProductVariantSet` por produto. Nenhum pacote externo será editado.
- Contrato de copy: descrições curtas identificam categoria e papel no ritual sem alegar composição, eficácia ou disponibilidade. O tamanho alternativo, seu valor e toda a embalagem são ilustrativos. As três entradas conceituais continuam explicitamente marcadas. A ação primária é explorar o item e, se desejar, encontrar uma unidade para confirmar informações; não simular compra.

## Envelope e no-loss

| Dimensão | Estado | Proteção |
| --- | --- | --- |
| Rotas e comportamento | Required | Nova rota `/produtos/:slug/`; todos os 8 cards devem abri-la; slug inválido tem saída para catálogo. |
| Dados demonstrativos | Allowed | Acrescentar descrição e 2 tamanhos/valores ilustrativos por item ao provider local. Não alterar nomes, fotos ou preços-base já aprovados. |
| Layout e copy | Required | Nova página de detalhe na mesma paleta, eixo máximo e tipografia observados no catálogo. Texto claro, sem claims não verificados. |
| Cores, logo, shell, footer, agendamento | Frozen | Preservar componentes compartilhados e identidade observada. |
| Catálogo, filtros, Home e outras rotas | Frozen | Os 8 cards, contagens, buscas, ordenação, sidebar mobile e CTA da Home devem continuar funcionais. |
| SDK e dependências | Frozen | Apenas hooks/tipos do SDK e provider local; sem checkout, carrinho, estoque ou mudanças nos pacotes. |

No-loss: catálogo com 8 produtos; cada imagem, nome, categoria, selo de conceito/histórico e preço-base; filtros completos; foco e teclado; rodapé/header/CTA de agendamento; aviso de amostra; viewport desktop, tablet, mobile e landscape; reduced motion.

## Matriz de adoção

| Alvo | Fonte / intenção | Invariantes e variáveis | Seam | Evidência | Estado |
| --- | --- | --- | --- | --- | --- |
| Card → detalhe | Pedido atual + grade aprovada | O card preserva imagem/copy/preço e ganha link acessível por slug | React Router, `Product.slug` do SDK | Navegação dos 8 itens, retorno e reentrada | Verified |
| Detalhe individual | Linguagem aprovada do catálogo e imagem individual | Uma foto da amostra, título, descrição, preço, aviso; composição responsiva | `useProduct(slug)` | Render, loading, erro e slug inválido em 4 viewports | Verified |
| Tamanho e preço | Pedido atual; contrato `ProductVariantSet` do SDK | Variação funcional, base mantém preço existente; alternativas rotuladas ilustrativas | `options`/`variants`, `getProductOptionGroups`, `selectionPrice` | Seleção por mouse/teclado, preço muda, rota reinicia padrão | Verified |
| Compra online | Sem loja/catálogo oficial | Não sugerir compra, disponibilidade ou estoque | Nenhum fluxo de checkout | Ausência de carrinho e claims de venda | Gap — depende de catálogo autorizado |

## Implementação, copy e feedback

- `src/commerce.ts`: descrições curtas e duas opções ilustrativas de tamanho/valor por item. Os preços-base de `/produtos/` foram mantidos exatamente. O texto diz o que é cada item e seu lugar sugerido na rotina, sem alegações de fórmula ou eficácia. Título de detalhe = nome do produto, sem slogan que atrase a informação.
- `src/commerceProvider.ts`: `Product.description` vem dessa fonte local e `ProductVariantSet` entra no provider mock oficial. O loader `products.bySlug` do storefront anexa `options`/`variants`; a página usa `useProduct`, `getProductOptionGroups` e `selectionPrice` do SDK. Nenhuma lógica de carrinho, checkout ou estoque foi ativada.
- `src/CommercePage.tsx`: os oito cards tornaram-se links completos e acessíveis. `src/CommerceProductDetailPage.tsx`: imagem individual, breadcrumb, título, descrição, preço por tamanho, botão de unidade, saída ao catálogo e estado não encontrado. `src/product-detail.css` é local; shell/brand/header/footer não foram alterados. A rota entrou em `src/App.tsx` e `src/routes.ts`.
- Alternativas de CTA consideradas: “Ver unidades Walter’s” (mais direto, mas não comunica a confirmação necessária) e “Consultar disponibilidade” (implicaria consulta online inexistente). “Encontrar uma unidade” foi escolhido por apontar para uma página funcional sem prometer estoque. O título SEO usa o nome do item + Walter’s; o ambiente de amostra mantém `noindex,nofollow`.
- Feedback 02/10/2026: a primeira versão em tablet empilhava uma foto grande antes do preço. Classificação: defeito local de hierarquia responsiva. Correção: duas colunas entre 761 e 1100px; foto e preço aparecem lado a lado. Mobile continua empilhado com o nome primeiro. Capturas e QA repetidas.

## Verificação

- `node output/product-detail-qa.mjs`: os oito slugs carregam título, descrição, foto e duas opções; selecionar o tamanho alternativo por teclado altera o preço; preços-base iguais aos cards; não há botão de compra/carrinho. Rota inválida oferece retorno; catálogo → detalhe → catálogo funciona e reabrir o produto restaura o tamanho-base. Sem `pageerror`, imagem quebrada ou overflow.
- Capturas em `output/product-detail-{desktop,tablet,mobile,narrow-mobile,landscape,compact-landscape}.png` e versões `-full.png` (1440×900, 820×1180, 390×844, 320×700, 844×390, 568×350). Os dois nomes longos de barbearia também foram checados em 320px, sem overflow. Reduced motion manteve opções operáveis.
- `node output/catalog-grid-qa.mjs`: oito cards, categorias, busca, preço, ordenação, estado vazio e Home → catálogo seguem funcionando nos quatro viewports.
- `node scripts/check.mjs typecheck` e `node scripts/check.mjs build`: passaram. Build manteve apenas o aviso existente de bundle maior que 500 kB; não houve erro de compilação.
- Gap de conteúdo: tamanhos, preços, imagens e três itens conceituais dependem de catálogo autorizado antes de qualquer venda/publicação comercial. O aviso continua visível no detalhe e na lista.
