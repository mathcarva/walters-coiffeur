# Walter’s — revisão do atalho flutuante (02/10/2026)

Estado: implementado e verificado localmente; aguardando crítica visual do responsável.

## Alvo e fontes

- Aplicativo: `C:\Users\Mat\Documents\Faya Labs\Fayz\fayz-app\walters-coiffeur`, pacote `@fayz/walters-coiffeur`, preview `http://127.0.0.1:3014/`, sem Git/remote no alvo. Escrita somente neste aplicativo; SDK e demais projetos ficam intactos.
- Prioridade: correção explícita do usuário para o atalho flutuante > linguagem visual de trabalho em `docs/home-redesign-2026-10-02.md` > comportamento observado em `src/App.tsx` e `src/chrome.css`. A captura enviada mostra o estado atual; não é uma especificação para copiar.
- Fonte de mídia: `public/editorial-2026/booking-portrait-v2.jpg`, imagem conceitual já usada na exploração visual Walter’s. Não substitui foto documental da marca.

## Matriz de adoção e envelope

| Alvo | Fonte/intenção | Invariantes e no-loss | Variáveis e seam | Responsividade/evidência | Estado |
| --- | --- | --- | --- | --- | --- |
| Atalho flutuante em todas as rotas | Pedido atual; dar presença editorial e imagem ao convite | Surge após rolagem >100px, pode ser dispensado, abre o mesmo `BookingPanel`, não reaparece na sessão depois de dispensar/abrir, aviso de prévia legível | Copy, composição, foto e CSS locais em `App.tsx`/`chrome.css`; sem mudanças no SDK | Desktop, tablet, mobile portrait/landscape, reduced motion; captura e interação antes/depois | Verified |
| Painel e fluxo de agendamento | Produto observado e plugin oficial instalado | Busca de unidade, foco, fechamento, estados e dados demonstrativos intactos | Nenhuma | Abrir pelo novo CTA e fechar | Verified |

Envelope: `required` imagem, hierarquia/cor/crop, legibilidade e ação clara; `allowed` copy do atalho, CSS e markup do próprio card; `frozen` header, outras seções, produtos, rotas, conteúdo do painel, dados, dependências, assets oficiais e comportamento de sessão. A escala e os tons do card derivam da linguagem editorial já aceita, sem instituir novo token global de DS.

## Verificação e feedback

- `node scripts/check.mjs typecheck`, `node scripts/check.mjs build`, `node scripts/qa-floating.mjs` e `node scripts/qa-home.mjs` passaram. O build mantém o aviso preexistente de bundle acima de 500 kB.
- Capturas em `output/floating-qa/` para 1440×900, 820×1180, 390×844, 320×700, 844×390 e 568×320. O retrato local carregou, foco ficou em rosto/cabelo, copy e ação permaneceram dentro do card e não houve overflow horizontal. A Home recebeu uma variação menor do mesmo card para preservar sua composição; capturas em `output/home-qa/`.
- Dispensar e abrir o painel mantiveram a persistência na sessão; o diálogo abriu/fechou no mobile; `prefers-reduced-motion` removeu a animação de entrada. O card compacto landscape mede 360×112px, permanece dentro da viewport e não sequestra o scroll.
- Feedback 02/10: a primeira versão do card tinha 154px de altura efetiva em 568×320 apesar do mínimo nominal de 112px. Causa: contribuição min-content da grade. Correção: altura e dimensão da mídia explícitas na regra de landscape; a segunda execução passou. A Home tinha um atalho compacto observado; foi criada uma variação fotográfica de 310×112px para evitar ampliar a obstrução sobre o conteúdo.
- Auditoria classificou um aviso React preexistente na página de detalhe (`fetchPriority` em `<img>`) como fora do escopo deste card. Ele não impede a imagem nem o fluxo, mas não é uma alegação de console totalmente limpo.
