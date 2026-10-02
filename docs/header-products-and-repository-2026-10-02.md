# Walter’s — Produtos no header e primeiro envio ao repositório (02/10/2026)

Estado: header e menu implementados e verificados localmente; primeiro push pendente.

## Fingerprint e autoridade

- Produto: `C:\Users\Mat\Documents\Faya Labs\Fayz\fayz-app\walters-coiffeur`, pacote `@fayz/walters-coiffeur`, Vite `http://127.0.0.1:3014/`.
- Nenhum Git/remote local antes deste corte. O repositório explicitamente indicado pelo usuário é `https://github.com/mathcarva/walters-coiffeur`, público e vazio na inspeção de 02/10/2026 (`git ls-remote` sem refs). Não há branch remota ou histórico para substituir.
- Fonte de navegação: pedido explícito do usuário > rotas e `App.tsx` observados > linguagem de trabalho em `docs/home-redesign-2026-10-02.md`. A rota `/produtos/` e o menu completo já existem; falta o link no header de desktop.
- Escrita no aplicativo e em seu novo Git local. SDK, design system adjacente, site original e outros repositórios ficam fora do escopo. Envio de código ao GitHub não é publicação do site nem aprovação comercial da amostra.

## Matriz, envelope e no-loss

| Alvo | Intenção/fonte | Protegido | Mudança/contrato técnico | Evidência | Estado |
| --- | --- | --- | --- | --- | --- |
| Header desktop | Pedido atual: acesso direto a Produtos | Logo, demais links, CTA Agendar, cores, altura e menu responsivo | Adicionar `/produtos/` a `primary`; React Router `Link` e `aria-current` existentes | Desktop e tablet: link visível, rota correta, sem colisão | Verified |
| Menu completo | Produtos já está em `secondary`; não duplicar | Todas as rotas e interações de abrir/fechar | Mover entrada para `primary`, remover de `secondary`; rolagem continua disponível | Desktop, mobile portrait e compact landscape; contagem de links e navegação | Verified |
| Repositório | URL explicitamente autorizada | Fontes, mídias da amostra, SDK via dependências, documentação e skills; nada de segredo, build ou screenshots de QA | Git local novo, branch principal, remote `origin` exato; `.gitignore` para saídas geradas | Inventário de arquivos, build/typecheck, commit, push, `ls-remote` | Implemented locally; push pending |

Envelope: `required` novo link e envio do site; `allowed` organização dos links, `.gitignore`, README e registro de implementação; `frozen` aparência das páginas, rotas existentes, conteúdo/precificação demonstrativos, agendamento e dependências. No-loss: Home, serviços, unidades, institucional, franquias, Academy, Barbearia, Concept, catálogo, oito detalhes, CTA flutuante, painel, logo e versões responsivas. O projeto é uma amostra `noindex`; GitHub não deve ser confundido com deploy.

## Plano de verificação

1. Inspecionar arquivos rastreados antes de publicar e garantir que `node_modules/`, `dist/`, `output/`, `.env*` e segredos não sejam adicionados.
2. Verificar header/menu em 1440×900, 1024×768, 820×1180, 390×844 e 568×320; navegar para `/produtos/`, testar menu e ausência de overflow.
3. `node scripts/check.mjs typecheck` e `node scripts/check.mjs build`; comparar o remoto vazio novamente antes do push e confirmar hash/branch remotos depois.

## Evidência e feedback local

- `node scripts/qa-header-products.mjs` passou em desktop 1440×900 e 1024×768, limite de desktop 901×800, tablet 820×1180, mobile 390×844 e landscape 568×320. O link de header abriu o catálogo e recebeu `aria-current="page"`. No menu completo, Produtos apareceu uma vez e abriu a mesma rota; não houve overflow horizontal. Capturas em `output/header-products-qa/` (não versionadas).
- `node scripts/check.mjs typecheck` e `node scripts/check.mjs build` passaram. O aviso de chunk acima de 500 kB é anterior a esta mudança.
- O primeiro screenshot do menu foi capturado antes do fim da transição; classificação: defeito do teste, não do site. O script passou a aguardar 600 ms e a captura mostra o link acessível e a lista sem duplicação.
- Para o commit inicial, `.gitignore` exclui `node_modules/`, `dist/`, `output/`, `.env*` e `.codex/` (configuração local com caminho de máquina). `git add -n .` mostrou fontes, skills, documentação, imagens da amostra, package/lock e scripts, sem os diretórios excluídos. O envio ao GitHub continua separado da liberação para deploy.
