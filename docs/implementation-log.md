# Walter’s Coiffeur — adoção no site / registro inicial

**30/09/2026 · G1 técnico parcial; G2 visual local em andamento.** A pasta e a grafia `walters-coiffeur` foram confirmadas pelo responsável. Esta prévia não é a Home final, não contém mídia de campanha liberada, dados de unidade ou copy final e não pode ser publicada. A escolha Vite/React é uma base reversível para staging, não uma decisão de hospedagem, CMS ou SEO final.

## Fingerprint e fronteira

| Item | Valor verificado |
|---|---|
| Produto | `C:\Users\Mat\Documents\Faya Labs\Fayz\fayz-app\walters-coiffeur` |
| Pacote | `@fayz/walters-coiffeur` |
| Preview | `http://127.0.0.1:3014/` |
| Git e remote | Esta pasta foi criada neste gate; nenhum remote ou branch foi designado |
| SDK | `@fayz-ai/sdk@0.19.1`, `@fayz-ai/ui@0.25.0`; Vite e Tailwind pelas interfaces públicas. Build verificado com `FAYZ_SDK_SOURCE=published` |
| Escrita | Somente este produto de staging. `../walters-design-system/`, SDK, acervo de imagem e site público são leitura apenas |

## Autoridade e baseline

1. Aprovações WDS-016 e WDS-031 no [ledger do DS](../../walters-design-system/docs/feedback-ledger.md): hero e Passagem protegidos; Home desktop aceita, versão adaptativa em crítica.
2. [Protótipo funcional](../../walters-design-system/docs/home-prototype-functional-gate.md) e [arquitetura de experiência](../../walters-design-system/docs/site-experience-architecture-v1.md): percurso e comportamento, não mídia/copy liberadas.
3. [Plano de geração](../../walters-design-system/docs/site-generation-plan-v1.md) e [baseline público](../../walters-design-system/docs/site-public-baseline-v1.md): rotas e conteúdo a preservar sem assumir dados atuais.
4. [Copy do Sistema de Marketing](../../../deliverables/walters-site-copy-staging-v1.md): candidata, não aprovada editorialmente.

## Matriz de adoção — primeiro corte

| Alvo | Origem / intenção | Invariante e variável | Seam e ambiente | Estado |
|---|---|---|---|---|
| Projeto isolado e rotas de staging | Plano G1; garantir alvo separado e entrada direta | Slugs observados não desaparecem; conteúdo final ainda não é transferido | Vite/React Router, SDK publicado, porta 3014; `/` e rotas internas funcionam como reservas **não públicas** | `implemented` para fundação; `gap` para hospedagem/SSR ou prerender |
| Hero da Home | WDS-016; reconhecimento em três cenas | Sequência Beleza/Cores/Estilo, foco em cabelo/rosto, seleção/pausa | `ready` **somente para prévia local** com mídia de pesquisa servida em dev sem entrar no bundle; masters e direitos para publicação seguem `gap` | `ready` local / `gap` público |
| Encontro desktop | WDS-031; leitura editorial após hero | Eixo, respiro, retrato dominante e detalhe subordinado; textos da proposta de Marketing identificados como candidatos | `ready` **somente para prévia local** com estudos sintéticos do DS via servidor dev; copy e mídia finais seguem `gap` | `ready` local / `gap` público |
| Passagem de Plano | WDS-031; um pico expressivo | Reversão, liberação e ausência de pin em toque/altura curta; retrato cruza dois planos | `ready` **somente para prévia local**; foto de pesquisa, mídia final e aprovação adaptativa seguem `gap` | `ready` local / `gap` público |
| Serviços + Unidades | Arquitetura aprovada; decisão e contato reais | 14 categorias observadas; nenhuma disponibilidade ou booking inventados | Dados e canal governados ainda faltam | `blocked` para fluxo final |
| Páginas institucionais | Arquitetura aprovada; caminhos próprios | Academy, Barbearia, Concept e Franquias não são clones; Shop condicional | Copy candidata e operação atual a validar | `gap` |

## Envelope de mudança

| Dimensão | Estado neste gate |
|---|---|
| Arquitetura técnica | `allowed` apenas para projeto e rotas locais reversíveis; hosting/CMS/SEO final congelados até escolha |
| Cor e tipografia | `allowed` somente no marcador técnico interno; identidade de produção congelada |
| Layout e movimento | `frozen` para hero e Passagem aprovados; G2 pode implementar esses gestos em Home local e testá-los, sem mudar o DS |
| Copy e dados | `frozen` para publicação; na G2, copy candidata pode ser exibida apenas com aviso visível de prévia |
| Assets | `frozen` para bundle e publicação; a G2 pode ler um allowlist explícito de fotos do DS apenas pelo servidor de desenvolvimento, sem copiá-las |
| Estados e comportamento | `required`: navegação direta das rotas reservadas, retorno a `/`, fallback 404 e marcador inequívoco de staging |

## Sem perdas e verificação

- As oito rotas primárias observadas têm path reservado: `/`, `/servicos/`, `/unidades/`, `/institucional/`, `/academy/`, `/barbeariawalters/`, `/concept/` e `/sejanossofranqueado/`. Shop não foi criada sem confirmação operacional. Redirects de slugs futuros ainda não foram definidos.
- `index.html` contém `noindex,nofollow` e `robots.txt` bloqueia crawling. Não substituir isso antes de uma revisão de lançamento.
- `npm install --ignore-scripts`: 213 pacotes auditados e nenhuma vulnerabilidade relatada. `node scripts/check.mjs build` com `FAYZ_SDK_SOURCE=published`: TypeScript e Vite passaram. `npm run build` é afetado por um shim `node` quebrado em `C:\Users\Mat\node_modules\.bin`; o runner local usa `process.execPath`, e a invocação direta passou. Não alterar o shim externo neste projeto.
- Preview na porta 3014 respondeu HTTP 200 em `/`, `/servicos/`, `/unidades/` e `/robots.txt`. No browser, Home e Serviços exibiram o marcador de staging e os títulos corretos. Isso é QA de fundação, não QA visual da Home.

## G2 — corte visual local autorizado para implementação

O próximo corte é apenas Hero → Encontro → Passagem. A referência visual é a Home desktop WDS-031, com o Hero WDS-016 e a Passagem já protegidos. O site novo deve implementar a gramática, não importar páginas/componentes do DS nem torná-lo dependência de produto. As fotos são leitura temporária do acervo do DS por middleware **exclusivo do servidor dev** e não são copiadas para `public/` nem para `dist/`. Um build sem essa fonte deverá deixar o estado de mídia pendente explícito, e jamais mascarar a ausência de direitos. O enunciado conflitante “desde 1964” não será replicado no Hero. A copy da introdução e passagem continua candidata, não alegação aprovada.

QA exigido antes de marcar esta linha como implementada: desktop grande/médio/pequeno, tablet portrait/landscape e mobile portrait/landscape; início/meio/fim/retorno da Passagem; ausência de pin em toque, altura curta e reduced motion; seleção e pausa do Hero; foco/teclado, imagens quebradas, overflow e `dist/` sem fotos de pesquisa.

### Resultado técnico do corte G2 (30/09)

- Hero, Encontro e Passagem implementados na rota `/`; o restante da Home permanece explicitamente como próximo capítulo, não como seção final. O Hero preserva as três cenas, 8,5 s, seleção manual que pausa, pausa/reprodução e suspensão fora da tela. A data histórica conflitante não aparece.
- A Passagem preserva os dois planos e o retrato atravessando a fronteira. O pin ocorre só em desktop elegível; em formato curto, tablet e mobile a composição fica estática. `ScrollSmoother` está restrito ao mesmo desktop elegível. Encontro revela texto e duas imagens em direções distintas, de forma fixa por composição.
- Teste de browser em 1600×900, 1280×800, 1024×768, 768×1024, 844×390, 390×844 e 320×700: nenhuma mídia quebrada e nenhum overflow horizontal. Pin observado nos três desktop; ausente nos quatro formatos compactos. Em desktop, o plano claro foi observado durante o scroll e a seção liberou a página seguinte. Seleção de “Cores.”, pausa/reprodução, entrada por `#encontro`/`#passagem` e troca Home → Serviços → Home foram verificadas; o pin não permaneceu na rota Serviços. Console sem erros/avisos nos testes lidos.
- Build TypeScript/Vite passou. `dist/` contém **zero** arquivos de mídia de pesquisa, nenhuma URL `/__review-assets`, `noindex` e `robots.txt` com bloqueio. O middleware só existe em `vite serve` local com allowlist exato. A produção exibe fallback “Mídia pendente de liberação” em vez de servir foto sem licença.
- A verificação acima é **técnica**, não uma aprovação perceptiva da Home adaptativa. Ainda faltam teste de reduced motion em navegador/dispositivo, varredura de teclado completa, teste em toque real, fotos e logo master liberados, copy validada e decisão de hospedagem. Não publicar este build.

## Direção de 30/09 — construir o site completo

O responsável dispensou novas prévias de composição e pediu usar **a última Home como direção aceita** para avançar ao site final, mantendo seus efeitos e ajustando depois se necessário. Isso libera a continuidade de implementação no produto `@fayz/walters-coiffeur`; não equivale a autorização para trocar o domínio, publicar dados não validados ou distribuir fotografias de pesquisa. O site público atual, o DS e o SDK permanecem leitura apenas. A verificação de 30/09 no domínio oficial confirmou a navegação, as 14 categorias e 16 entradas visíveis de unidades; a página institucional continua conflitante sobre 1964/1965 e contém números datados.

| Alvo seguinte | Fonte / invariantes | Estado de adoção e limite |
|---|---|---|
| Home — cuidados, trabalho, universos e unidade | WDS-031 e arquitetura v1: escolha calma após a Passagem; profundidade em fotografia sem pin; três universos distintos; unidade acessível sem esperar animação | `ready` para composição e navegação local; textos candidatos e mídia sintética não são claims/fotos aprovados para publicar |
| Navegação, rodapé e ação flutuante | Arquitetura v1 e rota existente: Serviços/Unidades diretos; Academy/Barbearia/Concept acessíveis; ação de unidade sempre alcançável | `ready` para rotas, foco e layout; logo master e canal real de agendamento são `gap` |
| Serviços | Índice oficial de 14 categorias observado em 30/09; sem oferta, preço, vaga ou profissional inventados | `ready` para índice e busca/navegação local; disponibilidade por unidade é `blocked` até cadastro governado |
| Unidades | 16 entradas observadas no site oficial em 30/09; fonte operacional não recebida | `ready` para diretório pesquisável com rótulo de dados publicados e saída ao canal existente; `blocked` para prometer horários, vagas ou agendamento confirmado |
| Sobre, Academy, Barbearia, Concept, Franquias | Rotas e funções aprovadas pela arquitetura; copy do Marketing é candidata; site atual comprova destinos, não operação atual de cada programa | `ready` para páginas editoriais sem números/claims sensíveis; CTAs de curso, formato, franquia e compra dependem de canal confirmado |
| Mídia e publicação | Hero/Passagem usam pesquisa local; estudos sintéticos não comprovam equipe ou atendimento | `blocked` para distribuição pública até masters, direitos e revisão editorial. O build continua `noindex` |

Envelope desta etapa: `required` — Home completa, navegação, rotas e estados úteis; `frozen` — três cenas, foco do Hero, gramática e timing da Passagem, cores oficiais, efeitos compactos sem pin; `allowed` — composição dos capítulos ainda não protegidos, copy candidata local, organização das rotas internas. No-loss: oito rotas existentes, 14 categorias, 16 nomes observados de unidade, três universos, CTA de unidade e comportamento de seleção/pausa/reversão.

## Próximas dependências

1. Aprovação perceptiva da Home tablet/mobile do DS; masters de logo/foto e direitos de publicação.
2. Aprovação editorial da copy candidata, inclusive data 1964/1965 e descrições de universos.
3. Cadastro oficial de serviços e unidades, responsável por atualização e destino real de agendamento.
4. Hosting/CMS e forma de gerar HTML indexável por rota antes de transformar as reservas em páginas públicas.

## Resultado da continuidade — 30/09

- Home agora segue Hero → Encontro → Passagem → Cuidados → Trabalho → Universos → Encontrar unidade. Os efeitos aprovados de Hero/Passagem permanecem; Trabalho recebeu parallax contínuo e sem pin. Os demais capítulos usam entradas de texto e imagem com variação de direção. O movimento é removido quando `prefers-reduced-motion: reduce` está ativo; verificação perceptiva desse modo ainda falta.
- As sete rotas internas deixaram de ser reservas vazias: Serviços (14 categorias e busca), Unidades (16 entradas observadas e busca), A marca, Academy, Barbearia, Concept e Franquias. Há menu completo, rodapé e atalho flutuante de unidade após 4,5 s, dispensável por sessão. Não há horário, vaga, preço ou agenda inventados.
- O diretório exibe **dados transcritos do site público em 30/09**, não um cadastro operacional. Telefone, endereço, oferta por unidade e canal de agendamento ainda exigem validação antes de publicar. A data de fundação conflitante não foi repetida. Na primeira entrega deste corte, o cabeçalho tinha uma composição tipográfica provisória; ela foi substituída pela logo publicada na correção abaixo.
- QA local: build TypeScript/Vite com `FAYZ_SDK_SOURCE=published` passou. No browser, oito rotas em mobile 390×844, sete rotas em 320×700 e quatro rotas principais em 844×390, 768×1024, 1024×768, 1280×800 e 1600×900 não apresentaram overflow horizontal nem imagens quebradas. Menu mobile, navegação para Academy, busca por Niterói e por Corte, revelação de imagem/texto e ida Home → Serviços → Home foram exercitados; o pin não permaneceu na rota interna. Não houve teste em dispositivo físico, leitor de tela, teclado integral ou modo reduced-motion.
- A exceção de CSS autoral além do Tailwind foi ampliada para geometrias editoriais, responsividade e movimento deste produto. Esta etapa priorizou fidelidade à direção visual; conformidade completa do método de styling do `design-system-implementer` fica pendente de revisão.
- `index.html` continua `noindex`; não houve deploy, troca de domínio, commit ou push. O build continua sem imagens de pesquisa e sem master vetorial, logo não é um release público completo. Próximo gate concreto: receber masters/licenças, aprovar copy e cadastro operativo, definir hosting/SEO e repetir QA final.

## Correção de identidade — 30/09

**Origem e regra.** O responsável exigiu a logo do projeto original em todas as aplicações e proibiu qualquer marca inventada. O DS Walter’s já estabelecia “não reconstruir”; os PNGs claro/escuro catalogados nele são cópias de bytes idênticos aos arquivos `13129-logo-walters-white.png` e `13144-logo-walters-black.png` do acervo original publicado. O favicon é cópia exata de `13232-cropped-favicon-icon-1.png`. São arquivos observados do site público, não masters vetoriais.

| Alvo | Fonte aprovada para esta correção | Invariante / variável | Estado |
|---|---|---|---|
| Cabeçalho desktop/mobile e rodapé | Correção explícita do responsável + regra “Não reconstruir” do DS + PNG publicado claro | Mesmos bytes da fonte, proporção 250×152, sobre plano escuro sem caixa, filtro ou redigitação; apenas tamanho responsivo muda | `verified` local |
| Variante sobre fundo claro | PNG publicado escuro | Disponível em `public/brand/` via `BrandLogo variant="dark"`; nenhuma aplicação clara atual exige logo | `ready` |
| Favicon | PNG publicado do acervo original | Sem redesenho; aplicado em `index.html` | `verified` local |

**No-loss e verificação.** Navegação, Hero, seções, rotas, efeitos e CTAs não mudaram. A composição tipográfica provisória do cabeçalho foi removida. SHA-256 do PNG claro em origem, produto e `dist/`: `D440AB8781DC436D2666EABB51F914544FE34E0A053E24422F21A8969A5E63BF`; escuro: `556681F6F82050549D9E02ABDCDC26E845778F72DFD4D18386E065060937528E`; favicon: `6EC708E1CD155EA29898FDC19573C339B8DEB664A1F322975AC3368856B504F1`. Build TypeScript/Vite passou. No navegador, cabeçalho desktop e mobile 390×844 e rodapé mobile exibiram o PNG com proporção natural, sem corte, overflow ou mídia quebrada. Master vetorial e licença formal permanecem pendentes para publicação.

## G5 — agendamento e loja em prévia local (01/10)

**Fingerprint:** `C:\Users\Mat\Documents\Faya Labs\Fayz\fayz-app\walters-coiffeur`, pacote `@fayz/walters-coiffeur`, sem Git/remote, origem `http://127.0.0.1:3014/`. Escrita restrita a este produto; `walters-design-system`, `fayz-sdk` e site público foram consultados sem alteração. Loja oficial consultada diretamente no navegador em 01/10: “This store is currently unavailable”. Resultados indexados antigos não estabelecem catálogo vigente.

| Alvo | Fonte, invariante e mudança permitida | Conexão técnica | Estado |
|---|---|---|---|
| Card e painel de agendamento | Aprovação explícita; comportamento de entrada única/4,5 s e reabertura do Jacques Janine, mas cor, logo, geometria e copy Walter’s | `BookingPanel`, `PublicBookingDataProvider` fail-closed; sem `BookingWidget` ou confirmação simulada | Implementado em staging; integração real bloqueada por cadastro operativo |
| Vitrine da Home | Aprovação explícita de alguns produtos e acesso à loja; Hero, Passagem, demais seções e limite de 1380 px congelados | Três referências históricas em `Produtos`, mídia dev-only | Implementado em staging; catálogo atual bloqueado |
| `/produtos/` | Extensão documental de comércio do DS e pesquisa oficial; não transferir material histórico para preço/estoque | `@fayz-ai/storefront` `useProducts` + `@fayz-ai/shop` provider vazio, catálogo sem checkout | Implementado em staging; checkout bloqueado |

**No-loss/envelope:** oito rotas anteriores, 14 categorias, 16 unidades, três universos, logo oficial, seleção do Hero, Passagem e parallax preservados. `Required`: card, painel, vitrine, rota de produtos; `allowed`: composição desses novos capítulos, dependências SDK fixadas, copy que explica o estado de prévia; `frozen`: identidade aprovada, checkout, booking real e fotografias de pesquisa no bundle. Nenhum produto, preço ou slot foi inventado como dado atual.

**Verificação:** `FAYZ_SDK_SOURCE=published` com `node scripts/check.mjs typecheck` e `node scripts/check.mjs build` passou. Browser: card temporizado em nova sessão, painel com foco inicial, escolha de Shopping Leblon, contato, Escape e retorno de foco; abertura via menu mobile; `/produtos/` com filtro/busca e imagem de contexto carregada. Inspeção visual em desktop e mobile 390×844, painel em 844×390. O audit npm de produção apontou seis vulnerabilidades altas transitivas a partir do plugin de agenda; publicação permanece bloqueada. Ainda faltam QA de teclado integral, leitor de tela, toque real, reduced motion e catálogo oficial.

**Fechamento de QA local:** novo build com SDK publicado passou após os ajustes finais. A rota `/produtos/` abriu diretamente no navegador, todas as imagens dessa página carregaram e o console consultado não apresentou erros ou avisos. A loja continua sendo uma prévia sem checkout; a fotografia histórica é servida somente no desenvolvimento local, não no build distribuível.

## Correção do título de encontro em landscape — 05/10/2026

- **Alvo/fonte:** `C:\Users\Mat\Documents\Faya Labs\Fayz\fayz-app\walters-coiffeur`, pacote `@fayz/walters-coiffeur`, branch `main`, remote `mathcarva/walters-coiffeur`, preview `http://127.0.0.1:3014/`. Correção explícita do usuário sobre o título de `#encontrar` prevalece sobre a quebra observada na Home. DS/SDK, copy, foto, CTA, rotas e motion permanecem congelados; apenas tipografia e quebra responsiva desse título estavam liberadas.
- **Matriz:** `#encontrar` landscape → manter “de você começa aqui.” numa linha, sem cobrir o rosto → `src/home.css` → desktop/tablet/landscape compacto ajustados; retrato preservado → `verified`. Raiz: escala anterior permitia que o trecho em itálico invadisse a fotografia em larguras/alturas justas; correção local, sem mudança do design system.
- **Evidência:** em 1920×900, 1440×900, 1024×768, 1008×411, 844×390 e 701×600, o trecho em itálico ocupa uma linha e termina antes do início da fotografia. Em 390×844 a quebra original permanece; nenhum viewport testado apresentou overflow horizontal. A troca de orientação retrato → landscape → retrato sem recarga e o modo de movimento reduzido preservaram a regra correta. TypeScript, build Vite e `git diff --check` passaram. Sem commit, push ou alteração em outro repositório.

## Recorte da foto de encontro em mobile — 05/10/2026

- **Matriz e envelope:** `#encontrar` mobile retrato → correção explícita do usuário + foto existente `closing-portrait-v2.jpg` → rosto acima do título, sem faixa vazia abaixo → `src/home.css`. Somente enquadramento responsivo permitido; copy, CTA, asset, cores, desktop/landscape, SDK e motion congelados. Estado `verified` local.
- **Causa/correção:** `object-position` não deslocava verticalmente a foto na proporção do container. A imagem recebeu overscan de 15% e deslocamento igual para cima; até 360 px, 25% para acomodar o título mais longo sem cobrir o rosto. A fotografia original não foi alterada.
- **Validação:** inspeção visual em 320, 390, 425 e 700 px; desktop e landscape sem alteração. Em 320, 390, 425 e 844×390, a imagem carregou, manteve o rodapé do container preenchido, não criou overflow horizontal e preservou o CTA. Orientação sem recarga e movimento reduzido conferidos; sem erros de página/requisição. TypeScript, build Vite e `git diff --check` passaram. Sem commit ou push.
