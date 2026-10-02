# Walter’s Coiffeur — amostra de site

**Estado:** esta amostra contém Home, páginas institucionais, serviços, unidades, universos da marca, franquias, catálogo e detalhes individuais de produto. Inclui navegação responsiva, movimento e uma simulação interativa de agendamento. O produto é separado de `../walters-design-system/` e não substitui `waltercoiffeur.com.br`. A identidade usa os PNGs publicados da logo Walter’s, sem recomposição tipográfica. O código está no GitHub, mas o site **não está liberado para deploy público**: direitos de imagem/marca, catálogo, copy, dados operacionais e integração real ainda precisam de validação.

## Fingerprint

- Caminho absoluto: `C:\Users\Mat\Documents\Faya Labs\Fayz\fayz-app\walters-coiffeur`
- Pacote: `@fayz/walters-coiffeur`
- Preview local: `http://127.0.0.1:3014/`
- Repositório de código: `https://github.com/mathcarva/walters-coiffeur`; hospedagem do site não definida
- Fonte visual: `../walters-design-system/` (Home desktop WDS-031, hero WDS-016 e Passagem; continuidade para as demais seções autorizada em 30/09)
- Fontes de copy/dados: `../../deliverables/walters-site-copy-staging-v1.md` (proposta) e `../walters-design-system/docs/site-public-baseline-v1.md` (observado)
- Escrita autorizada aqui: código local e documentação de implementação. DS, SDK, acervo master e site público são leitura apenas.

## Execução

```bash
npm install
npm run dev
npm run build
```

Neste Windows, um shim `node` quebrado em `C:\Users\Mat\node_modules\.bin` intercepta comandos de `npm run`. Até esse ambiente externo ser corrigido, execute o gate cross-platform diretamente com `node scripts/check.mjs build` (ou `typecheck`) e o servidor com `node node_modules/vite/bin/vite.js --host 127.0.0.1 --port 3014`. O runner usa `process.execPath` e não depende do shim. Em um ambiente limpo, os scripts npm chamam o mesmo runner.

O site local é `noindex,nofollow` e `robots.txt` bloqueia indexação. Em desenvolvimento, algumas imagens de pesquisa do DS podem aparecer por um endpoint temporário com allowlist; **não entram no `dist/`**. As imagens editoriais e de produtos geradas em `public/` entram no build apenas como amostra visual, sem representar unidades, profissionais, clientes ou catálogo atual. Não apontar um domínio público para este build; antes disso faltam aprovação da copy, masters/direitos de marca e fotografia, dados de serviços/unidades/agendamento, arquitetura de conteúdo/hosting e QA de lançamento.

**Regra de marca:** nunca digitar, redesenhar, vetorizar, filtrar ou aproximar a logo. Use `BrandLogo` com os arquivos originais em `public/brand/`: claro sobre fundo escuro, escuro sobre fundo claro. O favicon também foi copiado literalmente do acervo publicado. Os PNGs são ativos observados do site original; o master vetorial ainda precisa ser fornecido pela marca.

O SDK publicado, e não o checkout irmão mutável, deve ser usado na validação final (`FAYZ_SDK_SOURCE=published`).

## Agendamento e produtos — amostra de 02/10/2026

- O card surge **depois de rolar** mais de 100 px, pode ser dispensado durante a sessão e também é acessível pelo cabeçalho, menu e seção final da Home. O painel une a busca de unidade à escolha de cuidado, data e horário. A disponibilidade e a simulação de escolha usam `createPublicBookingPlugin`, `useServices`, `useAvailableSlots` e `useCreateBooking` de `@fayz-ai/plugin-agenda/public`. O provedor é o mock do SDK, com horários/durações ilustrativos e contato sintético; **nenhuma reserva, pagamento ou envio de dados pessoais acontece**. O telefone publicado da unidade continua visível para confirmação real. Não conectar um tenant ou publicar essa simulação como agenda operacional sem validação.
- `/produtos/`, os oito detalhes e a seção da Home usam `@fayz-ai/storefront` sobre `createMockShopProvider` de `@fayz-ai/shop`. O seed em `src/commerceProvider.ts` parte de cinco nomes históricos observados em materiais de 2020 e acrescenta três conceitos claramente rotulados. Imagens, tamanhos alternativos e preços são **ilustrativos**, sem SKU, estoque ou checkout real; `commerceMode` permanece `catalog`. O destino oficial `https://loja.waltercoiffeur.com.br/` estava indisponível na consulta anterior.
- As referências históricas permanecem no DS e são servidas apenas no Vite dev. Os cinco arquivos em `public/demo-products/` são **visualizações conceituais** de embalagens sem marca/texto aplicado, geradas a partir dessas referências. A identificação dos itens fica na interface, não no rótulo. Dois estudos de grupo anteriores, com grafismos gerados que poderiam parecer oficiais, foram preservados fora do build em `concept-assets/` e não são exibidos no site. Mesmo os visuais sem rótulo não são prova documental; substituir pelo catálogo autorizado quando ele chegar. A loja real exige feed de SKUs ativos, variantes, mídia licenciada, preço/estoque, políticas, frete, pagamento e revisão de direitos antes de habilitar checkout.
- As frases de transição da Home são copy original de campanha, sem atribuição a terceiros nem alegação factual sobre resultado de serviço. Antes da publicação, revisar tom com a marca.
- Dependências publicadas e fixadas: `@fayz-ai/plugin-agenda@0.18.4`, `@fayz-ai/shop@0.33.0`, `@fayz-ai/storefront@0.33.0`. A auditoria npm de produção reportou seis avisos de severidade alta na cadeia transitiva do plugin de agenda (incluindo `drizzle-orm`); não rodar `npm audit fix --force` sem revisão do SDK. Este staging não deve ser publicado com esse risco pendente.
