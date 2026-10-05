# Internal-page redesign adoption · 2026-10-05

## Target and authority

- Target: `@fayz/walters-coiffeur`, `fayz-app/walters-coiffeur`, remote `mathcarva/walters-coiffeur`, local origin `http://127.0.0.1:3014/`.
- Visual source: approved current home implementation (`src/HomePage.tsx`, `src/home.css`) and its project brief (`docs/home-redesign-2026-10-02.md`). The official Walter’s site is content evidence, not a UI template. The product pages, home, global navigation, booking overlay, design-system source, and SDK source are outside this edit.
- Foundation: Vite/React/TypeScript; existing Fayz SDK, UI, agenda and shop dependencies remain. Public CRM form uses the supported headless `@fayz-ai/plugin-crm/public` seam. CSS is retained for editorial composition and motion; no new parallel component library.

## No-loss baseline and change envelope

Routes: `/servicos/`, `/unidades/`, `/institucional/`, `/academy/`, `/barbeariawalters/`, `/concept/`, `/sejanossofranqueado/`. Preserve service search (14 names), unit search (16 listings, phone/map links), route links, Academy outbound reference, franchise claims supported by the official page, mobile navigation and floating booking CTA. Preserve titles, accessibility, reduced-motion behavior and source cautions. Do not introduce invented financial terms or promise live booking/lead collection.

Allowed/required: internal-page color, typography, geometry, layout, section rhythm, supported copy, asset selection, subtle motion, and new franchise form. Frozen: home, commerce, shared header/footer, source data, actual booking behavior, SDK implementation, repository publication.

## Adoption matrix

| Target | Approved rule / intent | Protected behavior | Technical seam | Status |
|---|---|---|---|---|
| Services | Home's large editorial image, warm paper, burgundy emphasis | Full service inventory/search | `EditorialPages.tsx`, `editorial-pages.css` | verified |
| Units | Brand-led photographic introduction + calm directory | Search, contact, maps, caveat | same | verified |
| Institutional | People-first narrative and face/hair focal point | Walter Cabral/Academy story and links | same | verified |
| Academy | Editorial image + learning narrative | Four areas, official outbound link | same | verified |
| Barbearia | Male-focused imagery and distinct dark atmosphere | Hair/beard care and unit path | same | verified |
| Concept | Experience-led interior imagery | Accurate format description and unit path | same | verified |
| Franchise | Home-aligned storytelling + honest lead path | Official support pillars, Academy, contact and source | same + CRM public plugin | verified in preview |
| Franchise transport | Public CRM lead, no fabricated confirmation | No personal data sent in preview | plugin adapter + public env | gap: tenant/public endpoint not supplied; visual form remains non-submitting |

## Verification ledger

Before edit, the institutional page had a generic split hero, large empty editorial gaps and a research-only image that would not ship. Franchise had a generic four-card grid and no form. Browser baseline captured at 1440×900.

Implementation: replaced the legacy route component/CSS with page-specific editorial sections, photo-led heroes, responsive grids, image reveals, and restrained desktop parallax. All content-only source cautions and directory/service interactions remain. Franchise now has a branded form using the SDK's headless `useLeadForm`, attribution/tags and a custom provider through the documented `dataProvider` seam. Without configuration it explicitly declines submissions, saves nothing and offers the official contact email.

Validation: TypeScript and Vite production build passed; `scripts/qa-internal.mjs` passed seven routes at desktop 1440×900, tablet 820×1180, mobile 390×844 and compact landscape 844×390. No overflow, missing loaded images or runtime exceptions; hero actions remain reachable. Service and unit searches returned expected results. Preview form remained disabled and a synthetic submit produced zero `create_public_lead` requests. Animated desktop hero transform changed across scroll, while heading and story reveal completed. Home, products and unknown-route smoke checks passed without overflow. Full-page screenshots were inspected at desktop and mobile with lazy images loaded.

Feedback ledger: 2026-10-05 → institutional/franchise → old composition mismatched approved home → implementation defect → legacy route file and research-only asset → product layer → replaced route composition/assets → responsive/browser/build checks → verified. 2026-10-05 → franchise transport → no tenant/public endpoint → external configuration gap → disabled honest preview and documented environment contract → no-send browser check → pending activation.

Unresolved CRM activation requires tenant ID, public project URL/key, deployed `create_public_lead` RPC and approved privacy notice before enabling actual collection. The published RPC and real inbox/CRM delivery could not be tested without those credentials. No repository push or SDK-source change was made in this slice.

Dependency note: `npm audit --omit=dev` reports 16 high-severity advisories in the current production dependency tree, including SDK packages and their transitive dependencies. No blanket upgrade/fix was attempted because that would exceed this visual/form change envelope; resolve in a separate dependency review before production release.
