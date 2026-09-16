# Landing Cleanup Plan

Goal: delete everything that belongs only to the admin dashboard, keep everything the marketing landing page needs, and make the landing page the new `/` route. This file is analysis only — nothing has been deleted, moved, or edited yet. The next command, `/remove-dashboard`, executes this plan.

---

## 1. Project overview

| Item | Value |
|---|---|
| Framework | Next.js 16.1.1 (App Router) |
| Language | TypeScript 5.9.3 |
| Routing | File-based, App Router route groups: `(auth)`, `(dashboard)`, plus standalone `src/app/landing/` |
| Styling | Tailwind CSS v4 (`@tailwindcss/postcss`), `tw-animate-css`, CSS variables theme in `src/app/globals.css` |
| UI library | shadcn/ui ("new-york" style) on Radix UI primitives, `lucide-react` icons |
| State management | React Context (theme, sidebar config) + local `useState`; `zustand` used only inside the dashboard (chat/mail) |
| Forms | `react-hook-form` + `@hookform/resolvers` + `zod` (used by landing, auth, and dashboard) |
| Package manager | pnpm (`pnpm-lock.yaml` present) |
| Scripts | `dev`: `next dev` · `build`: `next build` · `start`: `next start` · `lint`: `next lint` (no dedicated typecheck script; `tsc --noEmit` via `next.config`'s `noEmit` in tsconfig) |
| Path alias | `@/*` → `./src/*` (tsconfig), matches shadcn `components.json` aliases |

---

## 2. Folder tree (depth 4, filtered)

```
.
├── public/                          (images/icons, see §8)
├── src/
│   ├── app/
│   │   ├── (auth)/
│   │   │   ├── errors/{forbidden,internal-server-error,not-found,unauthorized,under-maintenance}/
│   │   │   ├── forgot-password/, forgot-password-2/, forgot-password-3/
│   │   │   ├── sign-in/, sign-in-2/, sign-in-3/
│   │   │   ├── sign-up/, sign-up-2/, sign-up-3/
│   │   │   └── layout.tsx
│   │   ├── (dashboard)/
│   │   │   ├── calendar/, chat/, dashboard/, dashboard-2/, faqs/, mail/,
│   │   │   │   pricing/, settings/{account,appearance,billing,connections,notifications,user}/,
│   │   │   │   tasks/, users/
│   │   │   └── layout.tsx
│   │   ├── landing/
│   │   │   ├── components/ (14 section files, see §4)
│   │   │   ├── landing-page-content.tsx
│   │   │   └── page.tsx
│   │   ├── favicon.ico
│   │   ├── globals.css
│   │   ├── layout.tsx        (root layout)
│   │   ├── loading.tsx
│   │   ├── not-found.tsx
│   │   └── page.tsx           (currently redirects "/" → "/dashboard")
│   ├── assets/react.svg
│   ├── components/
│   │   ├── landing/mega-menu.tsx
│   │   ├── layouts/base-layout.tsx     (dead code, see §5)
│   │   ├── theme-customizer/ (6 files)
│   │   ├── ui/ (37 shadcn primitives)
│   │   └── (17 top-level files: app-sidebar, site-header, site-footer, nav-*, command-search,
│   │        pricing-plans, sidebar-notification, upgrade-to-pro-button, theme-customizer.tsx,
│   │        theme-provider.tsx, mode-toggle.tsx, dot-pattern.tsx, image-3d.tsx, logo.tsx,
│   │        color-picker.tsx, dynamic-imports.ts)
│   ├── config/ (theme-customizer-constants.ts, theme-data.ts)
│   ├── contexts/ (sidebar-context.tsx, theme-context.ts)
│   ├── hooks/ (6 files)
│   ├── lib/ (fonts.ts, utils.ts)
│   ├── types/ (theme-customizer.ts, theme.ts)
│   ├── utils/ (shadcn-ui-theme-presets.ts, tweakcn-theme-presets.ts)
│   └── middleware.ts
├── next.config.ts
├── components.json
└── package.json
```

---

## 3. Pages

| Route | File | Category | Why | Action |
|---|---|---|---|---|
| `/` | `src/app/page.tsx` | DASHBOARD (redirect stub) | Client component that `router.replace("/dashboard")` | **DELETE, replaced** — see §6/§9 |
| `/landing` | `src/app/landing/page.tsx` | LANDING | Full marketing home (hero, features, pricing, etc.) | **KEEP → MOVE to become new `/`** |
| `/dashboard` | `src/app/(dashboard)/dashboard/page.tsx` | DASHBOARD | Analytics overview, data table, charts | DELETE |
| `/dashboard-2` | `src/app/(dashboard)/dashboard-2/page.tsx` | DASHBOARD | Alternate e-commerce/CRM overview | DELETE |
| `/calendar` | `src/app/(dashboard)/calendar/page.tsx` | DASHBOARD | Calendar/event manager | DELETE |
| `/chat` | `src/app/(dashboard)/chat/page.tsx` | DASHBOARD | Chat app demo | DELETE |
| `/mail` | `src/app/(dashboard)/mail/page.tsx` | DASHBOARD | Mail client demo | DELETE |
| `/tasks` | `src/app/(dashboard)/tasks/page.tsx` | DASHBOARD | Kanban/task table demo | DELETE |
| `/users` | `src/app/(dashboard)/users/page.tsx` | DASHBOARD | User management table | DELETE |
| `/pricing` (dashboard) | `src/app/(dashboard)/pricing/page.tsx` | DASHBOARD | Pricing demo *rendered inside the admin sidebar shell*, separate from the real landing pricing section | DELETE |
| `/faqs` (dashboard) | `src/app/(dashboard)/faqs/page.tsx` | DASHBOARD | FAQ demo page inside the admin shell | DELETE |
| `/settings/account` etc. (6 routes) | `src/app/(dashboard)/settings/*/page.tsx` | DASHBOARD | Account/appearance/billing/connections/notifications/user settings | DELETE |
| `/sign-in`, `/sign-in-2`, `/sign-in-3` | `src/app/(auth)/sign-in*/page.tsx` | AUTH | Sign-in variants | ASK (landing "Sign In" CTA links here) |
| `/sign-up`, `/sign-up-2`, `/sign-up-3` | `src/app/(auth)/sign-up*/page.tsx` | AUTH | Sign-up variants | ASK (landing "Get Started" CTA links here) |
| `/forgot-password`, `-2`, `-3` | `src/app/(auth)/forgot-password*/page.tsx` | AUTH | Password reset variants | ASK |
| `/errors/forbidden` | `src/app/(auth)/errors/forbidden/page.tsx` | AUTH | 403 page | ASK |
| `/errors/internal-server-error` | `.../internal-server-error/page.tsx` | AUTH | 500 page | ASK |
| `/errors/not-found` | `.../not-found/page.tsx` | AUTH | Custom 404 (separate from root `not-found.tsx`) | ASK |
| `/errors/unauthorized` | `.../unauthorized/page.tsx` | AUTH | 401 page | ASK |
| `/errors/under-maintenance` | `.../under-maintenance/page.tsx` | AUTH | Maintenance page | ASK |
| 404 fallback | `src/app/not-found.tsx` | LANDING (infra) | Global Next.js not-found boundary; links to `/dashboard` today | KEEP, EDIT link |
| loading fallback | `src/app/loading.tsx` | LANDING (infra) | Global loading boundary, generic spinner | KEEP as-is |
| root layout | `src/app/layout.tsx` | LANDING (infra) | Wraps whole app in `ThemeProvider` + `SidebarConfigProvider` | KEEP, EDIT (drop `SidebarConfigProvider`) |
| `(auth)` layout | `src/app/(auth)/layout.tsx` | AUTH | Minimal wrapper, no dashboard deps | ASK (tied to auth pages) |
| `(dashboard)` layout | `src/app/(dashboard)/layout.tsx` | DASHBOARD | Renders `AppSidebar` + `SiteHeader` + `SiteFooter` + `ThemeCustomizer` + `UpgradeToProButton` | DELETE |
| middleware | `src/middleware.ts` | DASHBOARD-adjacent | Redirects `/login`→`/auth/sign-in`, `/register`→`/auth/sign-up` (targets are already wrong — see §9) | ASK / EDIT |

**Root route note:** `/` currently renders `src/app/page.tsx`, a client component that immediately redirects to `/dashboard`. Per the hard requirement, `/` must resolve to the landing home page. The exact fix is specified in §9 and the checklist in §12.

---

## 4. Landing sections found (for reuse when building the new landing page)

All under `src/app/landing/components/`, orchestrated by `src/app/landing/landing-page-content.tsx`:

| Section | File |
|---|---|
| Navbar (+ mega menu) | `src/app/landing/components/navbar.tsx` (uses `src/components/landing/mega-menu.tsx`) |
| Hero | `src/app/landing/components/hero-section.tsx` |
| Logo carousel | `src/app/landing/components/logo-carousel.tsx` |
| Stats | `src/app/landing/components/stats-section.tsx` |
| About | `src/app/landing/components/about-section.tsx` |
| Features | `src/app/landing/components/features-section.tsx` (uses `src/components/image-3d.tsx`) |
| Team | `src/app/landing/components/team-section.tsx` |
| Pricing | `src/app/landing/components/pricing-section.tsx` |
| Testimonials | `src/app/landing/components/testimonials-section.tsx` |
| Blog | `src/app/landing/components/blog-section.tsx` |
| FAQ | `src/app/landing/components/faq-section.tsx` |
| CTA | `src/app/landing/components/cta-section.tsx` |
| Contact | `src/app/landing/components/contact-section.tsx` |
| Footer | `src/app/landing/components/footer.tsx` |
| Landing theme customizer (dev tool, optional) | `src/app/landing/components/landing-theme-customizer.tsx` |

---

## 5. Files

### KEEP (landing-only)
- `src/app/landing/**` (page, content, all 14 section components) — will move, see §9/§12
- `src/components/landing/mega-menu.tsx` — only used by `navbar.tsx`
- `src/components/image-3d.tsx` — only used by `features-section.tsx`
- `src/components/dot-pattern.tsx` — only used by `hero-section.tsx`, `stats-section.tsx`
- `src/components/ui/card-decorator.tsx` — only used by `about-section.tsx`, `team-section.tsx`
- `src/components/ui/navigation-menu.tsx` — only used by `navbar.tsx`

### KEEP (shared — used by landing AND/OR auth AND dashboard, so safe regardless of ASK answers)
- `src/app/layout.tsx`, `src/app/loading.tsx`, `src/app/not-found.tsx`, `src/app/globals.css`
- `src/components/logo.tsx` — used by landing footer/navbar and by dashboard/auth
- `src/components/mode-toggle.tsx` — used by landing navbar and dashboard site-header
- `src/components/color-picker.tsx` — used by landing theme customizer and dashboard theme customizer
- `src/components/theme-provider.tsx`
- `src/components/theme-customizer/import-modal.tsx` — used directly by `landing-theme-customizer.tsx` and by dashboard's `theme-customizer/theme-tab.tsx`
- `src/components/theme-customizer/circular-transition.css` — imported by `landing-theme-customizer.tsx` and `mode-toggle.tsx`
- `src/hooks/use-theme.ts`, `src/hooks/use-theme-manager.ts`, `src/hooks/use-circular-transition.ts`
- `src/contexts/theme-context.ts`
- `src/config/theme-data.ts` — evidence: imported by `landing-theme-customizer.tsx` and `hooks/use-theme-manager.ts`
- `src/config/theme-customizer-constants.ts` — only `radiusOptions`/`baseColors` exports are shared (landing uses them); `sidebarVariants`/`sidebarCollapsibleOptions`/`sidebarSideOptions` exports are dashboard-only, see **Files to edit**
- `src/types/theme-customizer.ts` — `ImportedTheme`, `ThemePreset`, `ColorTheme`, `RadiusOption`, `BrandColor` used by landing; `SidebarVariant`/`SidebarCollapsibleOption`/`SidebarSideOption` are dashboard-only, see **Files to edit**
- `src/utils/shadcn-ui-theme-presets.ts`, `src/utils/tweakcn-theme-presets.ts`
- `src/lib/utils.ts`, `src/lib/fonts.ts`
- `src/components/ui/{accordion,avatar,badge,button,card,checkbox,collapsible,dialog,form,input,label,select,separator,sheet,textarea,toggle,toggle-group}.tsx` — each has at least one landing (or landing-theme-customizer) importer per the import trace in §4/step-4 tracing; `dialog.tsx` is kept because `theme-customizer/import-modal.tsx` (used by landing) depends on it; `checkbox.tsx`, `form.tsx`, `input.tsx`, `label.tsx` are also needed if AUTH pages are kept (ASK)
- `src/app/(auth)/layout.tsx` and all `(auth)` page/component files — ASK, but if kept they only pull from the shared list above, nothing dashboard-only

### DELETE (dashboard-only)
Route folders:
- `src/app/(dashboard)/` — entire directory (layout + calendar, chat, dashboard, dashboard-2, faqs, mail, pricing, settings/*, tasks, users, and every `components/`, `data/`, `schemas/` subfolder inside them)

Top-level components (evidence: only imported from `(dashboard)/**` or from another dashboard-only file):
- `src/components/app-sidebar.tsx` — only `(dashboard)/layout.tsx`, `components/layouts/base-layout.tsx`
- `src/components/site-header.tsx` — only `(dashboard)/layout.tsx`, `base-layout.tsx`
- `src/components/site-footer.tsx` — only `(dashboard)/layout.tsx`, `base-layout.tsx` (distinct from `landing/components/footer.tsx`)
- `src/components/nav-main.tsx`, `nav-secondary.tsx`, `nav-user.tsx` — only `app-sidebar.tsx`
- `src/components/command-search.tsx` — only `site-header.tsx`
- `src/components/pricing-plans.tsx` — only `(dashboard)/pricing/page.tsx`
- `src/components/sidebar-notification.tsx` — only `app-sidebar.tsx`
- `src/components/upgrade-to-pro-button.tsx` — only `(dashboard)/layout.tsx`, `base-layout.tsx`
- `src/components/theme-customizer.tsx` (top-level re-export) — only `(dashboard)/layout.tsx`, `base-layout.tsx`, `dynamic-imports.ts`
- `src/components/theme-customizer/index.tsx`, `main.tsx`, `layout-tab.tsx`, `theme-tab.tsx` — `layout-tab.tsx` is sidebar-config specific (dashboard-only); `index.tsx`/`main.tsx`/`theme-tab.tsx` compose the *dashboard's* full theme customizer panel, which is separate from `landing-theme-customizer.tsx` (landing has its own self-contained customizer component and only reuses `import-modal.tsx` + `circular-transition.css` from this folder)
- `src/components/layouts/base-layout.tsx` — UNUSED dead code (see below), also fully dashboard-shaped; delete either way
- `src/components/dynamic-imports.ts` — UNUSED dead code, wraps the dashboard-only `ThemeCustomizer`

UI primitives (evidence from full import trace of `src/components/ui/*`):
- `src/components/ui/calendar.tsx` — only `(dashboard)/calendar/*`, `(dashboard)/mail/mail-display.tsx`
- `src/components/ui/chart.tsx` — only `(dashboard)/dashboard/*`, `(dashboard)/dashboard-2/*`
- `src/components/ui/command.tsx` — only `command-search.tsx`, `(dashboard)/tasks/data-table-faceted-filter.tsx`
- `src/components/ui/drawer.tsx` — only `(dashboard)/dashboard/components/data-table.tsx`
- `src/components/ui/dropdown-menu.tsx` — only dashboard pages + `nav-user.tsx`
- `src/components/ui/hover-card.tsx` — only `upgrade-to-pro-button.tsx`
- `src/components/ui/popover.tsx` — only dashboard pages
- `src/components/ui/progress.tsx` — only dashboard pages
- `src/components/ui/radio-group.tsx` — only `(dashboard)/settings/appearance/page.tsx`
- `src/components/ui/resizable.tsx` — only `(dashboard)/mail/components/mail.tsx`
- `src/components/ui/scroll-area.tsx` — only dashboard pages
- `src/components/ui/sidebar.tsx` — only `(dashboard)/layout.tsx`, `app-sidebar.tsx`, `nav-main.tsx`, `nav-user.tsx`, `nav-secondary.tsx`, `site-header.tsx`, `base-layout.tsx`, `theme-customizer/layout-tab.tsx`
- `src/components/ui/skeleton.tsx` — only used inside `ui/sidebar.tsx`
- `src/components/ui/switch.tsx` — only dashboard pages
- `src/components/ui/table.tsx` — only dashboard pages
- `src/components/ui/tabs.tsx` — only dashboard pages + `theme-customizer/index.tsx`
- `src/components/ui/tooltip.tsx` — only dashboard pages + `ui/sidebar.tsx`

Hooks/config/types (dashboard-only slice — see **Files to edit** for the shared files these live alongside):
- `src/hooks/use-sidebar-config.ts` — only `(dashboard)/layout.tsx`, `base-layout.tsx`
- `src/hooks/use-fullscreen.ts` — grep shows zero call sites anywhere (also effectively unused, but shaped for a dashboard fullscreen toggle — safe to delete)
- `src/hooks/use-mobile.ts` — only used inside `ui/sidebar.tsx`
- `src/contexts/sidebar-context.tsx` — `SidebarConfigProvider` is wired into the root layout, but its only real consumers (`useSidebarConfig`) are `(dashboard)/layout.tsx` and `theme-customizer/{index,layout-tab}.tsx`, all dashboard-only; once those are gone this file has no consumers left

### UNUSED (report only — not dashboard-only, just dead code; decide separately)
- `src/components/ui/breadcrumb.tsx` — zero importers anywhere in `src`
- `src/components/ui/loading-spinner.tsx` — zero importers anywhere in `src`
- `src/components/ui/sonner.tsx` — defines a `Toaster` wrapper that is never rendered anywhere (dashboard's `data-table.tsx` calls `toast()` from the raw `sonner` package directly, not through this wrapper)
- `src/components/layouts/base-layout.tsx` — never imported by anything (duplicates the inline JSX already in `(dashboard)/layout.tsx`); listed above under DELETE since it's dashboard-shaped anyway
- `src/components/dynamic-imports.ts` — never imported by anything; listed above under DELETE since it only wraps the dashboard `ThemeCustomizer`
- `src/types/theme.ts` — a `ThemeStyleProps`/`ThemeStyles`/`ThemePreset` type module, zero importers anywhere (distinct/duplicate of `ThemePreset` in `types/theme-customizer.ts`, which *is* used)
- `src/assets/react.svg` — zero references

---

## 6. Files to edit

| File | Exact change |
|---|---|
| `src/app/layout.tsx` | Remove the `SidebarConfigProvider` wrapper and its import `import { SidebarConfigProvider } from "@/contexts/sidebar-context"`, since its only consumers (`(dashboard)/layout.tsx`, `theme-customizer/index.tsx`, `theme-customizer/layout-tab.tsx`) are being deleted. Body becomes: `<ThemeProvider ...>{children}</ThemeProvider>`. Also update `metadata.title`/`description` from "Shadcn Dashboard" wording to landing-page copy. |
| `src/config/theme-customizer-constants.ts` | Remove the `sidebarVariants`, `sidebarCollapsibleOptions`, `sidebarSideOptions` exports (lines 18-36) and their now-unused type imports (`SidebarVariant`, `SidebarCollapsibleOption`, `SidebarSideOption`). Keep `radiusOptions` and `baseColors`. |
| `src/types/theme-customizer.ts` | Remove the `SidebarVariant`, `SidebarCollapsibleOption`, `SidebarSideOption` interfaces (lines 15-30). Keep `ThemePreset`, `ColorTheme`, `RadiusOption`, `BrandColor`, `ImportedTheme`. |
| `src/app/globals.css` | Remove the dead rule `.sidebar-none-mode [data-slot="sidebar"] { ... }` (line 133) — it only ever applied to the deleted dashboard sidebar. Optional: the `--sidebar-*` / `--chart-*` CSS variable tokens earlier in the file are harmless to leave (just unused custom properties) but can be pruned later. |
| `next.config.ts` | Remove the `redirects()` entry `{ source: '/home', destination: '/dashboard', permanent: true }` (dashboard target no longer exists). If a `/home` → `/` alias is still wanted, change the destination to `/`. |
| `src/middleware.ts` | Fix the redirect targets, which are already broken today (the `(auth)` folder is a route *group*, so URLs are `/sign-in` / `/sign-up`, not `/auth/sign-in` / `/auth/sign-up`): change `new URL('/auth/sign-in', request.url)` → `new URL('/sign-in', request.url)` and `new URL('/auth/sign-up', request.url)` → `new URL('/sign-up', request.url)`. (Only relevant if AUTH pages are kept — see Questions.) |
| `src/app/not-found.tsx` | Change `<Link href="/dashboard">Go to Dashboard</Link>` → `<Link href="/">Back to Home</Link>` (and update the button label). |

---

## 7. Packages to remove

All confirmed by grepping every `.ts`/`.tsx` import of the package name; none of these appear in any landing, root-layout, or shared file.

| Package | Where it's used (all dashboard-only) |
|---|---|
| `@dnd-kit/core`, `@dnd-kit/modifiers`, `@dnd-kit/sortable`, `@dnd-kit/utilities` | `(dashboard)/dashboard/components/data-table.tsx` (drag-to-reorder rows) |
| `recharts` | `ui/chart.tsx`, `(dashboard)/dashboard/components/{data-table,chart-area-interactive}.tsx`, `(dashboard)/dashboard-2/components/{revenue-breakdown,sales-chart,customer-insights}.tsx` |
| `react-day-picker` | `ui/calendar.tsx` (dashboard calendar + mail date pickers) |
| `cmdk` | `command-search.tsx`, `ui/command.tsx` |
| `vaul` | `ui/drawer.tsx` |
| `react-resizable-panels` | `ui/resizable.tsx` (mail split view) |
| `@tanstack/react-table` | `(dashboard)/tasks/**`, `(dashboard)/dashboard/components/data-table.tsx`, `(dashboard)/users/components/data-table.tsx` |
| `zustand` | `(dashboard)/chat/use-chat.ts`, `(dashboard)/mail/use-mail.ts` |
| `date-fns` | `(dashboard)/calendar/**`, `(dashboard)/chat/**`, `(dashboard)/mail/**` |
| `sonner` | `(dashboard)/dashboard/components/data-table.tsx` (`toast()` calls) and the unused `ui/sonner.tsx` wrapper |
| `next-themes` | Only referenced inside the unused `ui/sonner.tsx` (the app's real theming is the custom `ThemeProviderContext`, not `next-themes`) |
| `@radix-ui/react-dropdown-menu` | `ui/dropdown-menu.tsx`, `nav-user.tsx`, dashboard pages |
| `@radix-ui/react-hover-card` | `ui/hover-card.tsx` (only used by `upgrade-to-pro-button.tsx`) |
| `@radix-ui/react-popover` | `ui/popover.tsx` (dashboard only) |
| `@radix-ui/react-progress` | `ui/progress.tsx` (dashboard only) |
| `@radix-ui/react-radio-group` | `ui/radio-group.tsx` (dashboard only) |
| `@radix-ui/react-scroll-area` | `ui/scroll-area.tsx` (dashboard only) |
| `@radix-ui/react-switch` | `ui/switch.tsx` (dashboard only) |
| `@radix-ui/react-tabs` | `ui/tabs.tsx` (dashboard + dashboard theme-customizer only) |
| `@radix-ui/react-tooltip` | `ui/tooltip.tsx` (dashboard + `ui/sidebar.tsx` only) |

**Not removal candidates** (still used by landing or shared code, verified by grep): `@radix-ui/react-accordion`, `react-avatar`, `react-checkbox`, `react-collapsible`, `react-dialog`, `react-label`, `react-navigation-menu`, `react-select`, `react-separator`, `react-slot`, `react-toggle`, `react-toggle-group`; `@hookform/resolvers`, `react-hook-form`, `zod` (landing contact/footer forms + auth); `class-variance-authority`, `clsx`, `tailwind-merge`, `lucide-react`, `tw-animate-css`; `next`, `react`, `react-dom`, `postcss`, `tailwindcss`, `@tailwindcss/postcss`.

---

## 8. Assets to remove

`grep`ed every filename in `public/` against all of `src` — none of these are referenced by any `.tsx`/`.ts`/`.css` file:

- `public/apps.png`
- `public/customizer.png`
- `public/dashboard.png`
- `public/favicon-dark.png`
- `public/favicon.png`
- `public/file.svg`
- `public/globe.svg`
- `public/next.svg` *(the one apparent hit was a false positive substring match inside `ui/calendar.tsx`'s `rdp-button_next>svg` CSS selector string, not a real reference)*
- `public/vercel.svg`
- `public/window.svg`
- `src/assets/react.svg`

These look like unused/boilerplate leftovers rather than dashboard-specific assets, so they're listed for the user's judgment rather than auto-deleted as "dashboard-only." Also note: `src/app/favicon.ico` is the real, actively-served favicon (Next.js serves it implicitly) — do not delete it even though no `.tsx` file imports it.

**Used by landing, keep:** `public/dashboard-dark.png`, `public/dashboard-light.png` (hero section product screenshot), `public/feature-1-dark.png`, `public/feature-1-light.png`, `public/feature-2-dark.png`, `public/feature-2-light.png` (features section), `public/hero-images-container.png` (used by `upgrade-to-pro-button.tsx` — dashboard-only, so this one is actually a DELETE candidate, not landing — see correction below).

**Correction:** `public/hero-images-container.png` is only referenced by `src/components/upgrade-to-pro-button.tsx`, which is being deleted. Move it to the DELETE list, not KEEP.

---

## 9. Links, redirects and home route to fix

**Home route (hard requirement — landing must be served at `/`):**

`/` is currently `src/app/page.tsx`, a client component that does `router.replace("/dashboard")`. The real landing page lives at `src/app/landing/page.tsx` (metadata + `<LandingPageContent />`) with its content in `src/app/landing/landing-page-content.tsx`, which pulls in 14 section components from `src/app/landing/components/`.

Exact steps to make `/` resolve to the landing home page:
1. Delete `src/app/page.tsx` (the dashboard-redirect stub).
2. Move `src/app/landing/page.tsx` → `src/app/page.tsx` (same content: the `Metadata` export + `export default function LandingPage() { return <LandingPageContent /> }`). Its existing relative import `import { LandingPageContent } from './landing-page-content'` stays valid as-is once `landing-page-content.tsx` sits next to it (step 3).
3. Move `src/app/landing/landing-page-content.tsx` → `src/app/landing-page-content.tsx`. Inside this moved file, update every relative import from `./components/X` to `./landing/components/X` (12 import lines: navbar, hero-section, logo-carousel, stats-section, about-section, features-section, team-section, pricing-section, testimonials-section, blog-section, faq-section, cta-section, footer, landing-theme-customizer), since `src/app/landing/components/` itself is **not** moved — only the two route-level files move up.
4. Result: `src/app/landing/` now contains only `components/` (no `page.tsx`), so the `/landing` URL stops existing automatically — no duplicate route, and there is exactly one canonical landing page at `/`.

**Other links/redirects that will break or are already broken, to fix once the dashboard is gone:**

| File | Line(s) | Current | Fix |
|---|---|---|---|
| `src/app/landing/components/navbar.tsx` (moves to `src/app/landing/components/navbar.tsx`, unaffected by the move above) | 135, 252 | `<Link href="/dashboard">` ("View Dashboard" buttons, desktop + mobile) | Remove the Dashboard button entirely (no dashboard to link to) |
| `src/app/landing/components/navbar.tsx` | 141, 144, 260, 263 | `<Link href="/auth/sign-in">`, `<Link href="/auth/sign-up">` | Change to `/sign-in`, `/sign-up` — `(auth)` is a route *group*, so the real URLs have no `/auth` prefix. This is a pre-existing bug, independent of the dashboard removal. |
| `src/app/landing/components/hero-section.tsx` | 48 | `<Link href="/auth/sign-up">` | Change to `/sign-up` |
| `src/app/not-found.tsx` | 11 | `<Link href="/dashboard">Go to Dashboard</Link>` | Change to `<Link href="/">Back to Home</Link>` |
| `src/app/(auth)/errors/{forbidden,internal-server-error,not-found,unauthorized,under-maintenance}/components/*-error.tsx` | each ~line 24 | `router.push('/dashboard')` ("Go Back Home" button) | Change to `router.push('/')` |
| `src/app/(auth)/sign-in-2/components/login-form-2.tsx` | 13 | `<form ... action="/dashboard">` | Change to `action="/"` (or wire to real auth logic later) |
| `src/app/(auth)/sign-in-3/components/login-form-3.tsx` | 20 | `<form ... action="/dashboard">` | Change to `action="/"` |
| `next.config.ts` | `redirects()` | `{ source: '/home', destination: '/dashboard', permanent: true }` | Remove, or point to `/` if a `/home` alias is still wanted |
| `src/middleware.ts` | matcher redirects | `/login` → `/auth/sign-in`, `/register` → `/auth/sign-up` | Change targets to `/sign-in`, `/sign-up` (only matters if AUTH pages are kept) |

Note: sign-in/sign-up/forgot-password pages' own "back to home" links already correctly point to `href="/"` — no change needed there; they'll automatically pick up the new landing page once the route move in steps 1-4 is done.

---

## 10. Risks

- **AUTH pages are load-bearing for the landing CTAs.** The navbar's "Sign In" / "Get Started" buttons and the hero's "Get Started" button all link into the `(auth)` group. Deleting AUTH without also stripping those buttons/links from the landing page would produce dead links. Recommendation: keep AUTH (see Questions).
- **`src/contexts/sidebar-context.tsx` and `src/components/theme-customizer-constants.ts` are shared files with a dashboard-only slice inside them.** A naive "grep the file path, if it only shows up in dashboard files, delete it" approach would wrongly nuke `theme-customizer-constants.ts` (it has both shared and dashboard-only exports) if done at file granularity instead of export granularity — handled explicitly in §6.
- **`sonner` (package) and `ui/sonner.tsx` (file) are separate questions.** The package is still imported directly (`import { toast } from "sonner"`) by a dashboard file, so it's a real removal candidate; the `ui/sonner.tsx` wrapper component is simply dead code today regardless of the dashboard.
- **Route-group naming is misleading.** `(auth)` does not map to `/auth/*` — several existing links already assume it does and are already broken today. This is called out in §9 but is not caused by this cleanup; worth fixing while touching these files anyway.
- **CSS custom properties for `--sidebar-*` and `--chart-*` tokens remain in `globals.css`** after cleanup. They're inert (nothing reads them once `ui/sidebar.tsx` and `ui/chart.tsx` are gone) but harmless; listed as optional/low-priority pruning, not required for correctness.
- **`public/dashboard-dark.png` / `public/dashboard-light.png`** are named like dashboard screenshots but are actually used by the *landing* hero section (they show a product screenshot mockup). Confirm before deleting anything matching `dashboard*` in `public/` — don't pattern-match on filename alone.

---

## 11. Questions for the user

1. **Keep the AUTH route group (`(auth)`: sign-in/sign-up/forgot-password/error pages)?**
   Recommendation: **Keep it.** The landing navbar and hero both link to `/sign-in` and `/sign-up`; deleting AUTH now would leave dead CTAs on the new home page. It has no dashboard dependencies (confirmed by import trace) so it costs nothing to keep.
   Answer: Yes, keep it (accepting recommendation).

2. **Keep all 3 sign-in/sign-up/forgot-password variants (`-1`, `-2`, `-3`), or trim to one each?**
   Recommendation: Keep for now; trimming is a design decision better made once you're actively rebuilding the landing page and know which auth style matches it. Note `sign-in-2` and `sign-in-3` have a placeholder `action="/dashboard"` on their `<form>` that needs fixing regardless (see §9).
   Answer: Keep all 3 variants for now (accepting recommendation). Fix the `action="/dashboard"` placeholders.

3. **Keep the 5 auth error pages (`/errors/forbidden`, `/errors/internal-server-error`, `/errors/not-found`, `/errors/unauthorized`, `/errors/under-maintenance`)?**
   Recommendation: Keep `not-found` and `internal-server-error` (generically useful), consider dropping `forbidden`/`unauthorized`/`under-maintenance` since without a real dashboard/auth backend they have no trigger condition. Low priority either way — none of them import anything dashboard-only.
   Answer: Accepting recommendation — keep `not-found` and `internal-server-error`, drop `forbidden`, `unauthorized`, `under-maintenance`.

4. **Keep `src/app/landing/components/landing-theme-customizer.tsx` (the "customize this template" side panel) on the new landing page?**
   Recommendation: Keep — it's landing-specific, self-contained, and doesn't depend on anything dashboard-only. But if you're about to redesign the landing page from scratch, it may be one of the first things you replace/remove anyway since it's a template-demo feature, not a product feature.
   Answer: Keep (accepting recommendation).

5. **Delete the unused/boilerplate assets in §8** (`apps.png`, `customizer.png`, `dashboard.png`, `favicon-dark.png`, `favicon.png`, `file.svg`, `globe.svg`, `next.svg`, `vercel.svg`, `window.svg`, `src/assets/react.svg`)?
   Recommendation: Yes, delete — none are referenced anywhere, and several are Next.js's default `create-next-app` boilerplate that was never cleaned up.
   Answer: Yes, delete (accepting recommendation).

6. **Delete the other UNUSED (non-dashboard) dead code** (`ui/breadcrumb.tsx`, `ui/loading-spinner.tsx`, `ui/sonner.tsx`, `types/theme.ts`)?
   Recommendation: Yes, delete — zero importers, not needed by the landing page, and they'd just be confusing leftovers when you start rebuilding.
   Answer: Yes, delete (accepting recommendation).

7. **`/home` redirect in `next.config.ts`** — drop entirely, or repoint to `/`?
   Recommendation: Repoint to `/` only if some external link/bookmark relies on `/home`; otherwise just delete the redirect rule since it currently only exists to serve the dashboard.
   Answer: Delete the redirect rule (accepting recommendation).

8. **Root layout metadata** (`title: "Shadcn Dashboard"`) — update now as part of this cleanup, or leave for the landing-page rebuild step?
   Recommendation: Update now to something landing-appropriate (or a placeholder) since it's a one-line change and the current title is actively wrong once the dashboard is gone.
   Answer: Update now to a landing-appropriate placeholder title (accepting recommendation).

---

## 12. Deletion checklist

Ordered so nothing is removed before its remaining dependents are handled.

**A. Route move (do first, so `/` never goes dead even mid-cleanup)**
- [x] Move `src/app/landing/page.tsx` → `src/app/page.tsx` (overwrite the old redirect stub)
- [x] Move `src/app/landing/landing-page-content.tsx` → `src/app/landing-page-content.tsx`
- [x] In the moved `src/app/landing-page-content.tsx`, update all 12 `./components/X` imports to `./landing/components/X`
- [x] Verify `src/app/landing/` now contains only `components/`

**B. Delete dashboard route group**
- [x] Delete `src/app/(dashboard)/` (entire directory: `layout.tsx` + `calendar/`, `chat/`, `dashboard/`, `dashboard-2/`, `faqs/`, `mail/`, `pricing/`, `settings/`, `tasks/`, `users/`)

**C. Delete dashboard-only top-level components**
- [x] `src/components/app-sidebar.tsx`
- [x] `src/components/site-header.tsx`
- [x] `src/components/site-footer.tsx`
- [x] `src/components/nav-main.tsx`
- [x] `src/components/nav-secondary.tsx`
- [x] `src/components/nav-user.tsx`
- [x] `src/components/command-search.tsx`
- [x] `src/components/pricing-plans.tsx`
- [x] `src/components/sidebar-notification.tsx`
- [x] `src/components/upgrade-to-pro-button.tsx`
- [x] `src/components/theme-customizer.tsx`
- [x] `src/components/theme-customizer/index.tsx`
- [x] `src/components/theme-customizer/main.tsx`
- [x] `src/components/theme-customizer/layout-tab.tsx`
- [x] `src/components/theme-customizer/theme-tab.tsx`
- [x] `src/components/layouts/base-layout.tsx` (and the now-empty `src/components/layouts/` folder)
- [x] `src/components/dynamic-imports.ts`

**D. Delete dashboard-only UI primitives**
- [x] `src/components/ui/calendar.tsx`
- [x] `src/components/ui/chart.tsx`
- [x] `src/components/ui/command.tsx`
- [x] `src/components/ui/drawer.tsx`
- [x] `src/components/ui/dropdown-menu.tsx`
- [x] `src/components/ui/hover-card.tsx`
- [x] `src/components/ui/popover.tsx`
- [x] `src/components/ui/progress.tsx`
- [x] `src/components/ui/radio-group.tsx`
- [x] `src/components/ui/resizable.tsx`
- [x] `src/components/ui/scroll-area.tsx`
- [x] `src/components/ui/sidebar.tsx`
- [x] `src/components/ui/skeleton.tsx`
- [x] `src/components/ui/switch.tsx`
- [x] `src/components/ui/table.tsx`
- [x] `src/components/ui/tabs.tsx`
- [x] `src/components/ui/tooltip.tsx`

**E. Delete dashboard-only hooks/contexts**
- [x] `src/hooks/use-sidebar-config.ts`
- [x] `src/hooks/use-fullscreen.ts`
- [x] `src/hooks/use-mobile.ts`
- [x] `src/contexts/sidebar-context.tsx`

**F. Edit shared files to drop their dashboard-only slice**
- [x] `src/app/layout.tsx` — remove `SidebarConfigProvider` wrapper + import; update metadata (pending Q8)
- [x] `src/config/theme-customizer-constants.ts` — remove `sidebarVariants`, `sidebarCollapsibleOptions`, `sidebarSideOptions` + their type imports
- [x] `src/types/theme-customizer.ts` — remove `SidebarVariant`, `SidebarCollapsibleOption`, `SidebarSideOption` interfaces
- [x] `src/app/globals.css` — remove `.sidebar-none-mode [data-slot="sidebar"] { ... }` rule

**G. Fix links/redirects**
- [x] `src/app/landing/components/navbar.tsx` — remove "View Dashboard" buttons (desktop + mobile); fix `/auth/sign-in` → `/sign-in`, `/auth/sign-up` → `/sign-up`
- [x] `src/app/landing/components/hero-section.tsx` — fix `/auth/sign-up` → `/sign-up`
- [x] `src/app/not-found.tsx` — fix `/dashboard` → `/`
- [x] `src/app/(auth)/errors/*/components/*-error.tsx` (5 files) — fix `router.push('/dashboard')` → `router.push('/')`
- [x] `src/app/(auth)/sign-in-2/components/login-form-2.tsx` — fix `action="/dashboard"` → `action="/"`
- [x] `src/app/(auth)/sign-in-3/components/login-form-3.tsx` — fix `action="/dashboard"` → `action="/"`
- [x] `next.config.ts` — remove or repoint the `/home` → `/dashboard` redirect (pending Q7)
- [x] `src/middleware.ts` — fix `/auth/sign-in` → `/sign-in`, `/auth/sign-up` → `/sign-up` (only if AUTH kept, pending Q1)

**H. Remove dashboard-only packages** (`pnpm remove ...`)
- [x] `@dnd-kit/core` `@dnd-kit/modifiers` `@dnd-kit/sortable` `@dnd-kit/utilities`
- [x] `recharts`
- [x] `react-day-picker`
- [x] `cmdk`
- [x] `vaul`
- [x] `react-resizable-panels`
- [x] `@tanstack/react-table`
- [x] `zustand`
- [x] `date-fns`
- [x] `sonner` (pending Q6 — also delete `ui/sonner.tsx` first)
- [x] `next-themes` (pending Q6)
- [x] `@radix-ui/react-dropdown-menu`
- [x] `@radix-ui/react-hover-card`
- [x] `@radix-ui/react-popover`
- [x] `@radix-ui/react-progress`
- [x] `@radix-ui/react-radio-group`
- [x] `@radix-ui/react-scroll-area`
- [x] `@radix-ui/react-switch`
- [x] `@radix-ui/react-tabs`
- [x] `@radix-ui/react-tooltip`

**I. Remove assets** (pending Q5)
- [x] `public/apps.png`
- [x] `public/customizer.png`
- [x] `public/dashboard.png`
- [x] `public/favicon-dark.png`
- [x] `public/favicon.png`
- [x] `public/file.svg`
- [x] `public/globe.svg`
- [x] `public/next.svg`
- [x] `public/vercel.svg`
- [x] `public/window.svg`
- [x] `src/assets/react.svg` (and empty `src/assets/` folder)
- [x] `public/hero-images-container.png` (only used by deleted `upgrade-to-pro-button.tsx`)

**J. Remove other unused dead code** (pending Q6)
- [x] `src/components/ui/breadcrumb.tsx`
- [x] `src/components/ui/loading-spinner.tsx`
- [x] `src/components/ui/sonner.tsx`
- [x] ~~`src/types/theme.ts`~~ **RESTORED, not deleted** — see "Plan correction" in Cleanup result below; it's a real dependency of `utils/shadcn-ui-theme-presets.ts` and `utils/tweakcn-theme-presets.ts`

**K. Verify**
- [ ] `pnpm dev` starts and `/` renders the landing page — NOT run in this pass (no browser available); `pnpm build` succeeding and generating a static `/` route is a strong proxy, but user should smoke-test `pnpm dev` themselves
- [x] `pnpm build` succeeds with no missing-module errors — confirmed, see Cleanup result
- [ ] `pnpm lint` passes — could not run: `next lint` no longer exists in Next.js 16 (script still calls it) and raw `eslint` crashes with a pre-existing `@eslint/eslintrc` FlatCompat/ESLint 9.39.2 incompatibility (circular JSON error), reproduced identically before any changes were made — this is a baseline tooling issue, not caused by this cleanup
- [ ] Click through every landing nav link, CTA button, and footer link — NOT manually clicked (no browser); all known broken links were fixed by grep/static-analysis and the build's static route list was verified instead
- [x] Confirm no remaining source file references `/dashboard`, `@/components/app-sidebar`, `@/components/ui/sidebar`, or any other deleted path (`grep -rn "dashboard" src` as a final sanity pass) — confirmed clean, see Cleanup result

---

## Cleanup result

Executed on branch `landing-only`, on top of baseline commit `79f2ab1`. No new branch created, `main` untouched.

### 0. Baseline (before any deletion)
- `npx tsc --noEmit`: **10 pre-existing errors**, all inside files that were slated for deletion (`src/app/(dashboard)/tasks/components/data-table-toolbar.tsx` — 2 errors — and `src/components/ui/chart.tsx` — 8 errors). Not fixed, not counted as regressions; they disappeared automatically when those files were deleted.
- `pnpm build`: **failed at baseline** with the same root cause (`data-table-toolbar.tsx` type error). This is a pre-existing bug in a file that no longer exists.
- `pnpm lint` / `next lint`: **broken at baseline**, unrelated to this cleanup. Next.js 16.1.1 removed the `next lint` subcommand (`next lint` now errors "Invalid project directory provided, no such directory: .../lint"), and running `eslint` directly crashes with `TypeError: Converting circular structure to JSON` inside `@eslint/eslintrc`'s `FlatCompat` bridge (ESLint 9.39.2 + `eslint-config-next`'s legacy-config compat layer). Reproduced identically after the cleanup — confirmed not a regression, just an unfixed tooling gap in the starting repo.

### 1. Files deleted (154 total via `git rm -r`)
- Entire `src/app/(dashboard)/` route group (layout + `calendar/`, `chat/`, `dashboard/`, `dashboard-2/`, `faqs/`, `mail/`, `pricing/`, `settings/*` (6 sub-routes), `tasks/`, `users/`, all their `components/`, `data/`, `schemas/` subfolders) — 128 files.
- 3 auth error pages per the answered question: `src/app/(auth)/errors/forbidden/`, `.../unauthorized/`, `.../under-maintenance/` (page + component each) — 6 files. Kept `not-found` and `internal-server-error`.
- 17 dashboard-only top-level components: `app-sidebar.tsx`, `site-header.tsx`, `site-footer.tsx`, `nav-main.tsx`, `nav-secondary.tsx`, `nav-user.tsx`, `command-search.tsx`, `pricing-plans.tsx`, `sidebar-notification.tsx`, `upgrade-to-pro-button.tsx`, `theme-customizer.tsx`, `theme-customizer/{index,main,layout-tab,theme-tab}.tsx`, `layouts/base-layout.tsx` (also removed the now-empty `layouts/` folder), `dynamic-imports.ts`.
- 17 dashboard-only shadcn UI primitives: `calendar`, `chart`, `command`, `drawer`, `dropdown-menu`, `hover-card`, `popover`, `progress`, `radio-group`, `resizable`, `scroll-area`, `sidebar`, `skeleton`, `switch`, `table`, `tabs`, `tooltip` (all `src/components/ui/*.tsx`).
- 4 dashboard-only hooks/contexts: `hooks/use-sidebar-config.ts`, `hooks/use-fullscreen.ts`, `hooks/use-mobile.ts`, `contexts/sidebar-context.tsx`.
- 4 other dead-code files (zero importers, per answered question): `ui/breadcrumb.tsx`, `ui/loading-spinner.tsx`, `ui/sonner.tsx`, `types/theme.ts` — **note:** `types/theme.ts` was restored after being deleted, see "Plan correction" below; it is NOT actually deleted in the final result.
- 12 unused/boilerplate assets: `public/{apps,customizer,dashboard,favicon-dark,favicon,vercel}.png/.ico`, `public/{file,globe,next,window}.svg`, `src/assets/react.svg` (and the now-empty `src/assets/` folder), `public/hero-images-container.png` (only used by the deleted `upgrade-to-pro-button.tsx`).

### 2. Plan correction found during execution
`src/types/theme.ts` was listed in the plan (§5, §12.J) as dead code with "zero importers anywhere." This was **inaccurate**: `src/utils/shadcn-ui-theme-presets.ts` and `src/utils/tweakcn-theme-presets.ts` (both explicitly KEEP/shared files) import it via the relative path `../types/theme` — the plan's own re-verification grep (and mine, initially) only checked the `@/types/theme` alias form and missed the relative import. This was caught by the post-deletion `tsc --noEmit` run (`Cannot find module '../types/theme'`), and the file was restored with `git checkout HEAD -- src/types/theme.ts`. **`src/types/theme.ts` is kept, not deleted**, despite the checklist box being ticked.

### 3. Files moved (route restructure, plan §9/§12.A)
- `src/app/landing/page.tsx` → `src/app/page.tsx` (overwrote the old client-side `router.replace("/dashboard")` stub — `/` now serves the real landing page).
- `src/app/landing/landing-page-content.tsx` → `src/app/landing-page-content.tsx`; its 12 relative imports (`./components/X`) were rewritten to `./landing/components/X` since only the two route-level files moved, not the `components/` folder.
- `src/app/landing/` now contains only `components/` — the `/landing` URL no longer exists; `/` is the sole canonical route.

### 4. Files edited (16)
| File | Change |
|---|---|
| `src/app/layout.tsx` | Removed `SidebarConfigProvider` wrapper + its import. Metadata title changed `"Shadcn Dashboard"` → `"Shadcn Landing"`, description updated to drop "dashboard" wording. |
| `src/config/theme-customizer-constants.ts` | Removed `sidebarVariants`, `sidebarCollapsibleOptions`, `sidebarSideOptions` exports and their now-unused type imports. Kept `radiusOptions`, `baseColors`. |
| `src/types/theme-customizer.ts` | Removed `SidebarVariant`, `SidebarCollapsibleOption`, `SidebarSideOption` interfaces. Kept `ThemePreset`, `ColorTheme`, `RadiusOption`, `BrandColor`, `ImportedTheme`. |
| `src/app/globals.css` | Removed the dead `.sidebar-none-mode [data-slot="sidebar"] {...}` rule and the dead "right-side inset variant" media-query block (both only ever applied to the deleted `ui/sidebar.tsx`). Left the inert `--sidebar-*`/`--chart-*` CSS custom-property *values* in the theme tokens section alone (harmless, shared with the theme-preset system — see note below). |
| `next.config.ts` | Removed the `redirects()` block entirely (`/home` → `/dashboard` — dashboard target no longer exists, no `/home` alias was requested). |
| `src/middleware.ts` | Fixed pre-existing broken redirect targets: `/auth/sign-in` → `/sign-in`, `/auth/sign-up` → `/sign-up` (route-group naming bug, unrelated to dashboard removal but fixed while touching this file per plan). |
| `src/app/not-found.tsx` | `<Link href="/dashboard">Go to Dashboard</Link>` → `<Link href="/">Back to Home</Link>`. |
| `src/app/landing/components/navbar.tsx` | Removed both "View Dashboard" buttons (desktop + mobile) and the now-unused `LayoutDashboard` icon import. Fixed `/auth/sign-in` → `/sign-in`, `/auth/sign-up` → `/sign-up` (desktop + mobile CTAs). |
| `src/app/landing/components/hero-section.tsx` | Fixed `/auth/sign-up` → `/sign-up` on the hero "Get Started Free" CTA. |
| `src/app/(auth)/errors/not-found/components/not-found-error.tsx` | `router.push('/dashboard')` → `router.push('/')`. |
| `src/app/(auth)/errors/internal-server-error/components/internal-server-error.tsx` | `router.push('/dashboard')` → `router.push('/')`. |
| `src/app/(auth)/sign-in-2/components/login-form-2.tsx` | `<form action="/dashboard">` → `<form action="#">` with a `// TODO: wire up to real auth backend once available` comment. |
| `src/app/(auth)/sign-in-3/components/login-form-3.tsx` | Same fix: `action="/dashboard"` → `action="#"` with the same TODO comment. |
| `package.json` / `pnpm-lock.yaml` | Updated by `pnpm remove` (see packages below). |

### 5. Packages removed (19, via `pnpm remove`, 64 packages dropped total incl. transitive deps)
Re-grepped every package name for zero remaining usage immediately before removal — all 19 confirmed unused:
`@dnd-kit/core`, `@dnd-kit/modifiers`, `@dnd-kit/sortable`, `@dnd-kit/utilities`, `recharts`, `react-day-picker`, `cmdk`, `vaul`, `react-resizable-panels`, `@tanstack/react-table`, `zustand`, `date-fns`, `sonner`, `next-themes`, `@radix-ui/react-dropdown-menu`, `@radix-ui/react-hover-card`, `@radix-ui/react-popover`, `@radix-ui/react-progress`, `@radix-ui/react-radio-group`, `@radix-ui/react-scroll-area`, `@radix-ui/react-switch`, `@radix-ui/react-tabs`, `@radix-ui/react-tooltip`.

No package was kept against the plan's recommendation — all 19 had zero usages.

### 6. TODOs left for dead links
- `src/app/(auth)/sign-in-2/components/login-form-2.tsx` and `sign-in-3/components/login-form-3.tsx`: form `action="#"` with `// TODO: wire up to real auth backend once available`.
- No landing-page buttons were left pointing at deleted routes — the only landing CTAs that pointed at a removed target ("View Dashboard", `/auth/sign-up`, `/auth/sign-in`) were either removed (View Dashboard buttons — no reasonable anchor target exists for a deleted feature) or repointed to the correct still-existing `/sign-in` / `/sign-up` routes (not `#`, since those routes are real, just had a wrong prefix).
- **Not touched, flagged for awareness:** several auth pages link to each other with the same incorrect `/auth/...` prefix bug (e.g. `sign-up/components/signup-form-1.tsx` → `/auth/sign-in`, `forgot-password-2` → `/auth/sign-in-2`, `sign-in/components/login-form-1.tsx` → `/auth/forgot-password`, etc. — 12 occurrences across 8 files). This is the same pre-existing route-group-naming bug documented in the plan's Risk section (§10) and only explicitly scoped for fixing in `navbar.tsx`, `hero-section.tsx`, and `middleware.ts` (§12.G). Left as-is since it's pre-existing, not caused by this cleanup, and outside the landing page / deletion-repair scope — but it means these particular auth-to-auth links currently 404. Worth a follow-up pass.

### 7. Check results
- **`npx tsc --noEmit`**: **PASS**, 0 errors (after restoring `types/theme.ts`).
- **`pnpm build`**: **PASS**. Final route list: `/`, `/_not-found`, `/errors/internal-server-error`, `/errors/not-found`, `/forgot-password`, `/forgot-password-2`, `/forgot-password-3`, `/sign-in`, `/sign-in-2`, `/sign-in-3`, `/sign-up`, `/sign-up-2`, `/sign-up-3` — all static (`○`). Middleware compiles (shown as "Proxy" due to the Next 16 middleware→proxy rename, a pre-existing deprecation warning, not touched — out of scope).
- **`pnpm lint`**: **BROKEN, pre-existing** (see Baseline section above) — not a regression, not fixed, out of scope per instructions.
- **Final leftover grep** (`dashboard`, `admin`, `sidebar`, deleted component/route names): no dead references to deleted routes or components remain. Two intentional non-issues found and left alone:
  - `sidebar` still appears in `src/utils/tweakcn-theme-presets.ts` and `src/hooks/use-theme-manager.ts` — these are `--sidebar-*` CSS custom-property *token names* used by the shared theme-preset/theme-customizer system (landing's "customize this template" panel), not a dashboard sidebar UI dependency. Legitimately kept.
  - "dashboard"/"admin" wording still appears in landing marketing copy (hero, features, footer, FAQ, CTA sections) and in `public/dashboard-{light,dark}.png` filenames — these describe the *product being marketed* (a template marketplace that sells admin dashboards) and the hero's product screenshot, not this repo's own now-deleted admin section. Left untouched per "don't redesign the landing page" instruction.
  - `package.json`'s `"name": "shadcn-dashboard-nextjs"` was left as-is (not in the plan's checklist, cosmetic only).
