# Kora School BP

Plataforma single-page (SPA) de **plano de negócios e controle de lançamento** da Kora School Brazil: modelagem financeira interativa (unit economics, fluxo de caixa, projeção ano a ano) e painel de execução do lançamento (timeline, workstreams, KPIs, matriz de risco), com exportação para Excel. Roda 100% no navegador — não há backend.

## Stack
- **Linguagem:** JavaScript (JSX, sem TypeScript).
- **Framework:** React 18.3 + Vite 7.1 (`type: module`, ESM).
- **UI/estilo:** Tailwind CSS 3.4 + PostCSS/Autoprefixer; ícones `lucide-react`; gráficos `recharts`.
- **Dados/utilitários:** `xlsx` (export Excel), `date-fns`, `clsx`.
- **Persistência:** `localStorage` (chave `ai-school-project-data`) — não há banco de dados nem API.
- **Package manager:** npm (`package-lock.json`).
- **Deploy:** build estático (`dist/`) servido em qualquer host estático (ex.: Vercel/Netlify). Não há `vercel.json` no repo.

## Comandos
- `npm install` — instala dependências.
- `npm run dev` — servidor de desenvolvimento Vite (HMR).
- `npm run build` — build de produção em `dist/`.
- `npm run preview` — serve o build localmente para conferência.
- **Lint/testes:** não há scripts de lint nem de teste configurados (ver seções abaixo).

## Estrutura
- `index.html` — entrypoint Vite; monta `#root` a partir de `src/main.jsx`.
- `src/App.jsx` — shell da aplicação e navegação entre os módulos.
- `src/context/ProjectContext.jsx` — estado global do projeto; carrega/salva em `localStorage`.
- `src/data/projectData.js` — dados-semente do plano (parâmetros iniciais).
- `src/utils/financialModel.js` — motor de cálculo financeiro.
- `src/utils/excelExport.js` — geração de planilhas via `xlsx`.
- `src/components/financial/` — dashboard financeiro: `UnitEconomics`, `CashFlow`, `YearByYearEditor`, `ParameterControl`, `PublicPartnerships`, `ConsolidatedView`, `PresentationMode`.
- `src/components/launch/` — controle de lançamento: `MasterTimeline`, `Workstreams`, `KPITracker`, `RiskMatrix`, `TeamView`, `TaskEditModal`.
- `src/components/shared/` — `ErrorBoundary`, `ReportBuilder`.

## Convenções de código
- Componentes React funcionais + hooks; um componente por arquivo `.jsx`.
- Estado compartilhado via `ProjectContext` — evite duplicar fonte de verdade; toda mutação deve fluir pelo contexto para persistir no `localStorage`.
- Estilização com utilitários Tailwind no JSX; use `clsx` para classes condicionais.
- Sem TypeScript: mantenha props/estruturas de dados consistentes com `src/data/projectData.js` e documente formatos não óbvios.

## Variáveis de ambiente
- **Nenhuma.** A aplicação não consome envs nem segredos em runtime (sem API/banco). `.env`, `.env.local` e `.env.*.local` já estão no `.gitignore` — não commite nenhum se for adicionado no futuro (prefixo `VITE_` é obrigatório para expor ao cliente no Vite).

## CI/CD & Deploy
- Não há workflows em `.github/workflows/` nem `vercel.json`.
- Deploy recomendado: host estático apontando para `npm run build` → publicar `dist/`.
- **CI mínimo sugerido (via PR)** em `.github/workflows/ci.yml`: `npm ci` + `npm run build`. Como não há lint/typecheck, garantir ao menos que o build passa evita quebrar `main`.

## Boas práticas de PR
- Branches: `feat/…`, `fix/…`, `chore/…`.
- Commits no padrão Conventional Commits (`feat:`, `fix:`, `docs:`, `chore:`…).
- PRs pequenos e focados. Checklist antes de abrir:
  - `npm run build` passa localmente;
  - nenhum segredo/arquivo `.env` incluído;
  - screenshots de antes/depois para mudanças de UI;
  - se alterar formato de dados persistidos (`ai-school-project-data`), descrever migração/compatibilidade com dados já salvos no navegador.
- Pelo menos 1 review; merge via squash; `main` sempre deployável.

## Testes
- Não há testes hoje.
- Recomendação proporcional: se a lógica de `financialModel.js` crescer, adicionar **Vitest** (integra nativamente com Vite) cobrindo os cálculos de unit economics e fluxo de caixa — é o núcleo de valor do produto.

## Segurança & dados
- Nunca commitar `.env`/segredos (não há nenhum hoje).
- Dados do plano ficam apenas no `localStorage` do usuário; ao adicionar export/import, atenção para não vazar dados sensíveis em logs ou artefatos.
- Revisar dependências periodicamente (`npm audit`); `xlsx` já teve CVEs históricos — manter atualizado.

## Gotchas
- **Toda persistência é `localStorage`**: limpar o navegador apaga o plano; não há sincronização entre dispositivos. Alterações no shape dos dados exigem cuidado com dados antigos já salvos (ver `ProjectContext.jsx`, que faz `getItem`/`setItem`).
- Vite 7 exige Node recente; se o build falhar, verifique a versão do Node.
- `optimizeDeps`/ícones: `lucide-react` é grande — importe ícones individualmente para não inflar o bundle.
- Sem TypeScript nem lint: erros de tipo/props só aparecem em runtime — teste manualmente os fluxos afetados.
