# Walter’s Coiffeur — plano de reconstrução da Home

Estado: Home implementada localmente para crítica visual; não é aprovação de identidade nem publicação.

## Alvo e prioridade

- Produto editável: `C:\Users\Mat\Documents\Faya Labs\Fayz\fayz-app\walters-coiffeur`, pacote `@fayz/walters-coiffeur`, preview `http://127.0.0.1:3014/`. Esta pasta não tem Git/remote.
- Fontes de autoridade: logo e paleta do manual Walter’s (preto, branco, bordô e cinza); pedido recente de reescrever a Home a partir das sete referências; conteúdo/rotas e provedores SDK já implementados. O storyboard antigo do DS serve como histórico, mas o pedido explícito de refazer substitui sua composição antiga de hero e Passagem nesta exploração.
- Fora de escopo neste corte: reescrever páginas internas, alterar SDK, afirmar catálogo/vagas reais, criar loja ou publicar. Imagens geradas são mídia **conceitual** da amostra, não retratos documentais de uma unidade ou profissionais Walter’s.

## Referências traduzidas em decisões, não cópias

| Referência do usuário | Papel aqui | Limite |
| --- | --- | --- |
| Serenity | Fotografia humana dominante e tipografia sobre imagem escura | Sem copiar layout de spa nem escurecer rosto/cabelo |
| KLUR / Le Labo | Respiro, hierarquia editorial e produto em papel claro | Produto não vira protagonista nem loja fictícia |
| Hana Cha | Ritmo alternado entre cena e leitura | Não importar símbolos, paleta ou temática de chá |
| Portfolio editorial | Escala tipográfica e encontro entre pessoa e tipo | Evitar ornamento, microtextos e excesso de linhas |
| Walter’s publicado | Logo original e caminhos da marca | Fotos publicadas sem licença não entram na nova Home |

## Identidade visual de trabalho

- Polos oficiais: preto e branco. Bordô `#71293C` é acento, não fundo de todas as seções. Papel quente e chocolate são **tons fotográficos/de interface propostos**, não novos tokens oficiais.
- Uma família fotográfica: retrato, cabelo, gesto e movimento; luz quente lateral, sombras espresso e pele natural. Foco seguro em olhos, nariz, boca e cabelo; hero desktop tem zona de texto à esquerda e variante vertical própria.
- Eixo de conteúdo `max-width: 1380px`, gutter responsivo. Apenas a mídia do hero e a faixa de movimento sangram até a borda; títulos, parágrafos e ações permanecem alinhados.
- Logo PNG original claro diretamente sobre o header escuro; sem caixa branca, filtro ou reconstrução. Fontes de sistema são provisórias até licença/arquivo oficial.
- Degradê de continuidade somente se foto e plano forem ambos escuros; superfície clara não recebe sombra para fundir fotografia.

## Percurso e copy candidata

1. Hero — “O seu jeito de ser, em primeiro plano.”; identificação imediata + encontrar/agendar.
2. Editorial claro — pessoa e cabelo em escala alta; explica a relação entre olhar, escolha e cuidado, com acesso à marca.
3. Serviços escuros — gesto visível e quatro entradas úteis; lista completa em `/servicos/`.
4. Respiro de afirmação — frase curta de autonomia, sem CTA de venda.
5. Movimento — uma imagem larga conduz aos universos Academy, Barbearia e Concept.
6. Produto como apoio — teaser pequeno do catálogo demonstrativo via SDK, sem preço/checkout.
7. Encontrar + agendar — ação explícita abre o painel SDK existente; o atalho flutuante permanece.

Toda copy nova é proposta editorial. Não há estatísticas, depoimentos ou promessa de resultado inventados.

## Contrato de movimento

- Entrada: texto assenta em distância curta; imagem de gesto abre uma vez por máscara. Sem animação de cada linha ou de cada imagem.
- Acompanhar: planos fotográficos com overscan leve e parallax lento em desktop elegível, sem mover textos ou expor bordas.
- Transição expressiva: imagem de movimento atravessa a virada claro/escuro uma vez; sem pin longo ou bloqueio de scroll.
- ScrollSmoother apenas desktop `>=1024px`, altura `>=620px`, hover e pointer fino, sem `prefers-reduced-motion`; duração percebida mais calma. Touch/landscape compacto usam scroll nativo.
- Reduced motion: sem máscara, parallax, smooth ou elementos invisíveis. Resize, troca de rota e retorno limpam triggers.

## Matriz de adoção e proteção

| Alvo | Estado / fonte | Protegido | Alterável neste corte |
| --- | --- | --- | --- |
| Header, logo e navegação | Logo oficial + produto atual | PNG original, rotas e menu | Transparência sobre o topo do novo hero |
| Home visual e copy | Pedido explícito + referências | Eixo máximo, rosto/cabelo e CTA de unidade | Composição, imagens sintéticas, copy, ritmo e motion |
| Serviços e universos | Rotas e dados locais observados | Destinos `/servicos/`, Academy, Barbearia, Concept | Ordem, apresentação e teaser |
| Produtos | Provider `@fayz-ai/storefront` atual | Sem alegar catálogo real, preço ou compra | Redução de proeminência na Home |
| Agendamento | Provider SDK e BookingPanel atuais | Abertura, foco, aviso de demonstração | CTA de entrada na Home |
| Páginas internas | Produto atual | Todas as rotas, conteúdo e estados | Congeladas neste corte |

## Gates de validação

1. Build/typecheck e recursos carregados no preview.
2. Desktop 1600×900, 1280×800 e 1024×768: hierarquia, alinhamento, crop e dois pontos de parallax.
3. Tablet 820×1180, mobile 390×844 e landscape 844×390: leitura, rosto/cabelo, menu e CTA sem overflow.
4. Reduced motion, navegação para páginas internas, abrir/fechar agendamento, voltar à Home, hash e resize.
5. Crítica do responsável antes de estender a direção às páginas internas ou formalizá-la no DS.

## Entrega e verificação deste corte

- Home reescrita em `src/HomePage.tsx` e `src/home.css` com cinco fotografias conceituais novas em `public/editorial-2026/`: `hero-desktop.png`, `hero-mobile.png`, `retrato-claro.png`, `gesto.png` e `movimento.png`. As duas variantes do hero preservam rosto e cabelo nas composições horizontal e vertical.
- O header usa o logo original e fica transparente apenas sobre o hero; o atalho flutuante existente foi preservado em versão compacta. Os botões de unidade/agendamento mantêm o fluxo do plugin de agenda. O teaser de produto continua lendo o provider SDK, mas não simula loja nem domina a Home.
- `node scripts/check.mjs build` e `node scripts/qa-home.mjs` passaram. Neste terminal, `npm run build` falha antes de executar o script com “O sistema não pode encontrar o caminho especificado”; a causa do wrapper npm ainda precisa ser isolada. Testados desktop 1600×900, 1280×800 e 1024×768; tablet 820×1180; mobile 390×844; landscape 844×390. Nenhum overflow horizontal, imagem quebrada ou erro JS. Conferidos retorno de rota interna, atalho flutuante, busca de unidade, abrir/fechar agendamento, entrada de seção, header sobre hero e reduced motion. Capturas em `output/home-qa/`.
- O arquivo Figma existente não foi alterado: a API do Figma retornou limite de chamadas do plano Starter antes da inspeção do arquivo. A proposta permanece no preview local e não deve ser confundida com um layout editável no Figma.
- Páginas internas continuam com a linguagem anterior e parte das mídias de pesquisa segue restrita ao ambiente de desenvolvimento. Elas são a próxima etapa **após crítica desta Home**; não há alegação de reescrita integral do site neste corte.

## Sequência de trabalho sem salto de etapa

| Etapa | Entrega verificável | Critério para avançar |
| --- | --- | --- |
| 1. Home editorial | Composição, cinco mídias novas, copy candidata, movimento, versão responsiva e fluxo de encontrar/agendar | Revisão visual da Home em desktop, tablet e mobile; registrar ajustes antes de replicar |
| 2. Linguagem aprovada | Fixar eixo, paleta de interface, tratamento de imagem, ritmo entre seções, tipografia e três gestos de motion | A direção deve funcionar em pelo menos Home, serviços e unidade — não apenas em um hero |
| 3. Páginas internas | Reescrever serviços, unidades, institucional e três universos com conteúdo rastreável; fotos originais de salão apenas nelas, quando adequadas e com origem identificada | Sem mídia pendente, crop problemático, conteúdo inventado ou página que volte ao template antigo |
| 4. Experiências SDK | Conectar diretório/unidade ao agendamento ilustrativo; manter produtos como estudo até catálogo real; usar exclusivamente os providers/plugins existentes | Fluxos, estados vazios, erro, foco e avisos de demonstração testados |
| 5. Consolidação | Figma editável quando o acesso voltar, tokens/componentes somente depois da aprovação visual; QA de todas as rotas e viewports | Capturas comparáveis, build, acessibilidade básica e validação do usuário |

O trabalho de produto não deve preceder a identidade da Home. As imagens de produto da amostra podem ser refeitas a partir dos itens listados, mas sem loja ou catálogo oficial. O Figma não é uma condição para **ver** esta proposta local; passa a ser necessário para transformá-la em fonte editável de design, quando o limite do MCP permitir.
