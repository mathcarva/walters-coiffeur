# Catálogo Walter’s — atualização da amostra (05/10/2026)

## Fonte e limite da informação

Os nomes e tamanhos abaixo foram lidos em imagens arquivadas da própria Walter’s, no diretório local `Walter-Coiffeur-imagens-organizadas/originais/site-media/`. Esse material não comprova catálogo, embalagem, estoque ou preço atuais. A apresentação continua sem compra ou checkout.

| Linha | Produtos e tamanhos documentados | Arquivo de origem |
| --- | --- | --- |
| Walter’s Professional | Shampoo Premium Brilho Extraordinário 500 ml; Condicionador Premium Brilho Extraordinário 500 ml | `11904-Lan-amentoprodutosWalters-13-1-scaled.jpg` |
| Barbearia Walter’s, frente | Shampoo para barba, cabelo e bigode 240 ml; Condicionador para barba, cabelo e bigode 240 ml; Cera Modeladora 85 g | `13106-Placa_informativo_produtos_barbearia_18x25_fev20_frente_150dpi-1.jpg` |
| Barbearia Walter’s, verso | Pomada Modeladora 85 g; Creme Pós Barba 140 g; Óleo Hidratante 60 ml; Gel de Barbear 140 g | `13107-Placa_informativo_produtos_barbearia_18x25_fev20_verso_150dpi-1.jpg` |

## Adoção no site e invariantes

| Área | Atualização | Preservado |
| --- | --- | --- |
| Dados | `src/commerce.ts`: nove nomes e tamanhos de fonte, sem máscara, sérum e óleo para barba inventados; apenas tamanhos documentados | Contrato de catálogo demonstrativo, preços claramente fictícios |
| Integração | `src/commerceProvider.ts`: nove produtos e suas variantes seguem `@fayz-ai/shop` e `@fayz-ai/storefront` | Provider mock, categorias, busca, filtros, ordenação, navegação e ausência de checkout |
| Visual | Nove packshots refeitos a partir das fotografias/folhas originais, em WebP em `public/product-catalog-2026/`; três imagens dos conceitos substituídos removidas | Embalagem histórica, cores originais (rosa-choque da Professional; preto, branco texturizado e azul da Barbearia), fundo neutro, grade, tipografia e layout do DS |
| Detalhe | Origem e tamanho documentado explícitos; embalagem e preço ilustrativos | Hero do produto, preço de demonstração, CTA para unidade e comportamento responsivo |

Após a correção do usuário, os nove packshots anteriores foram substituídos. As novas imagens foram editadas com o gerador de imagens integrado e exportadas em WebP 1000×1000. Prompt-base: “Isolar apenas o produto indicado na fotografia/folha original Walter’s; preservar forma do frasco/pote, pump/tampa, logo, hierarquia do rótulo e cores da embalagem; remover somente cenário, demais produtos e texto do documento; centralizar em fundo contínuo neutro com sombra suave; sem redesign, sem rótulo genérico, sem novas alegações.” Cada um dos nove prompts indicou a posição e o nome do produto na fonte. Correções pontuais retiraram uma data inventada do Gel de Barbear e corrigiram textos pequenos no condicionador Professional e no Creme Pós Barba. Como a folha da Barbearia é pequena, estas imagens continuam sendo recriações orientadas pela fonte, não fotografias oficiais nem garantia de fidelidade tipográfica absoluta.

## Verificação

- TypeScript `--noEmit`: passou.
- Build de produção Vite: passou, com aviso preexistente de bundle acima de 500 kB.
- Catálogo no navegador: nove cards, duas categorias (2 + 7), artes carregadas; detalhe de Pomada e Gel de Barbear abriu; conferência visual em desktop e viewport móvel de 390 px.
- `npm run typecheck` e `npm run build` retornam “O sistema não pode encontrar o caminho especificado” neste ambiente Windows, inclusive quando os scripts usam os binários locais diretamente; a causa está no executor do `npm run` e ainda não foi isolada. TypeScript e Vite passaram quando executados diretamente com `node`.

## Aplicação no site após aprovação do produto

**Alvo verificado:** `C:/Users/Mat/Documents/Faya Labs/Fayz/fayz-app/walters-coiffeur`, pacote `@fayz/walters-coiffeur`, branch `main`, remoto `https://github.com/mathcarva/walters-coiffeur.git`, prévia `http://127.0.0.1:3014/`. Apenas este produto foi editado; o design system e os pacotes do SDK permaneceram somente leitura.

**Prioridade das fontes:** correção e aprovação explícitas do usuário para embalagem fiel com cenário limpo; rótulo da fotografia `11904-Lan-amentoprodutosWalters-13-1-scaled.jpg`; títulos e descrições nas folhas `13106-...frente...jpg` e `13107-...verso...jpg`; composição já existente do site. Os textos das folhas são históricos, não alegações de catálogo atual.

| Alvo | Fonte e intenção | Invariantes / mudança permitida | Estado |
| --- | --- | --- | --- |
| Home / seção de produtos | Foto aprovada e nove packshots do acervo | Preservar seção, CTA, parallax e destino; trocar embalagens conceituais pela Professional e pela Cera Modeladora, ajustando somente o fundo/contraste para o cenário limpo | Verificado em desktop, tablet, mobile portrait e landscape compacto |
| `/produtos/` | Foto aprovada e folhas da Barbearia | Preservar nove itens, filtros, busca, preço demonstrativo e provider do SDK; usar títulos, imagens e busca por termos da descrição documentada | Verificado em mobile |
| `/produtos/:slug/` | Rótulo Professional e descrições das folhas | Preservar layout, variantes documentadas, CTA e aviso de amostra; substituir copy genérica por características registradas no material e contextualizar títulos curtos pela linha | Verificado em mobile |

**Títulos e descrição:** a Professional mantém os nomes “Shampoo Premium Brilho Extraordinário” e “Condicionador Premium Brilho Extraordinário”, além de proteína da seda, óleo de coco e redução de frizz indicados nos rótulos. A Barbearia usa os títulos das folhas — Shampoo, Condicionador, Cera Modeladora, Pomada Modeladora, Creme Pós Barba, Óleo Hidratante e Gel de Barbear — e descrições resumidas dos respectivos textos: mentol e extratos no Shampoo, aloe vera/óleo de amêndoas no Condicionador, fixação/acabamento na Cera e Pomada, mentol/aloe/pantenol no Pós Barba, óleos naturais no Óleo Hidratante e D-pantenol/transparência no Gel. As descrições foram editadas para leitura web, sem acrescentar benefícios não presentes nos documentos.

**Envelope e no-loss:** conteúdo e mídia de produtos eram obrigatórios; contraste do módulo da home podia adaptar-se ao fundo neutro; rotas, nove IDs, preços ilustrativos, busca/filtros, integração `@fayz-ai/shop`/`@fayz-ai/storefront`, agendamento, header, outras seções e motion ficaram congelados. Nenhum produto novo, tamanho ou preço real foi inferido.

**Verificação adicional:** imagens da home renderizadas com contraste legível no desktop, tablet, celular em retrato e paisagem compacta, sem rolagem horizontal; catálogo exibe nove itens e as artes atualizadas; busca por “mentol” retorna Shampoo e Creme Pós Barba; detalhes móveis de Shampoo e Gel de Barbear mostram títulos, descrições e imagens carregadas. O executor `npm run` falha neste ambiente Windows mesmo quando o script aponta diretamente aos binários locais; `node node_modules/typescript/bin/tsc --noEmit` e `node node_modules/vite/bin/vite.js build` passaram. Build com aviso de bundle acima de 500 kB. Não houve publicação ou push nesta etapa.

## Correção da cena editorial da Home (05/10/2026)

Após o feedback de que os packshots isolados quebravam a composição, a seção da Home voltou ao tratamento fotográfico de pedra, tecido bordô e fundo escuro. A cena principal em `public/editorial-2026/products-professional-archive-v3.jpg` foi gerada a partir da cena `products-professional-v2.jpg` e dos packshots documentados do Shampoo e Condicionador Premium Brilho Extraordinário. O card flutuante em `products-barber-archive-v3.jpg` usa a composição `products-barber-v2.jpg` e a Cera Modeladora 85 g, sem a mão da cena antiga. São **recriações editoriais**, não fotografias oficiais do produto nem garantia de fidelidade tipográfica absoluta.

Prompt principal, modo integrado: “Recriar a cena editorial existente de frascos sobre pedra úmida e tecido bordô; substituir os frascos genéricos pelas embalagens do Shampoo e Condicionador Walter’s Professional dos packshots de referência; preservar proporções, pumps pretos, logo, faixas magenta e distinção dos rótulos, com espaço escuro à direita para o texto do site.” Prompt do card, modo integrado: “Recriar a natureza-morta escura da Barbearia; substituir o pote genérico pela Cera Modeladora 85 g do packshot de referência, preservar tampa, rótulo e composição de pedra, toalha e navalha; remover a mão.” Ambos foram exportados em JPEG qualidade 92, mantendo os PNGs gerados fora do projeto. As imagens de catálogo continuam separadas e não foram alteradas nesta correção.

Mudança restrita à mídia, contraste e enquadramento da seção da Home; CTA, textos, integração SDK, parallax e demais páginas foram preservados. Conferidos desktop, tablet, mobile portrait e landscape: imagens carregadas, sem overflow nem erros de página; typecheck e build passaram, com o aviso preexistente de bundle acima de 500 kB. Não houve publicação ou push.
