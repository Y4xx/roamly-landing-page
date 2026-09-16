---
description: Full analysis of the dashboard + landing page template. Writes LANDING_CLEANUP_PLAN.md and deletes nothing.
argument-hint: "[optional notes, e.g. keep the login page]"
disable-model-invocation: true
---

# Analyze the project: keep the landing page, remove the dashboard

This project is a design template with two parts: an admin **dashboard** and a marketing **landing page**. The goal is to delete everything that belongs only to the dashboard, keep everything the landing page needs, and later build a new landing page on what remains. A wrong deletion breaks the landing page, so this step only analyzes and plans. Take your time and ultrathink.

Rules for this command:
- Do not delete, move, rename, or edit any existing file, and do not install or uninstall packages.
- The only file you create is `LANDING_CLEANUP_PLAN.md` in the project root. The next command, `/remove-dashboard`, executes it.

User notes (may be empty): $ARGUMENTS

## 1. Identify the stack
Read `package.json`, the lockfile, framework and build configs (Next, Vite, Nuxt, Astro, Angular, SvelteKit, Tailwind, PostCSS, tsconfig) and the README. Record: framework + version, TS or JS, routing type (file-based or config-based), styling and UI libraries, state management, package manager (from the lockfile), and the scripts for dev, build, lint and typecheck.
- Monorepo (`apps/`, `packages/`, workspaces): classify whole apps and packages first.
- Plain HTML template: every `.html` file is a page; note the CSS, JS and images each one loads.

Show the folder tree (depth 4) without `node_modules`, `.git`, `dist`, `build`, `.next`, `.nuxt`, `out`, `coverage`, `.cache`.

## 2. List every page and route
Pages, route groups such as `(admin)`, `(dashboard)`, `(auth)`, `(marketing)`, layouts, loading/error/not-found files, API routes, middleware, route guards and redirects. For config-based routers, read the router file (`App.tsx`, `router/index.ts`, `app.routes.ts`...) and list each route with its component. Note which page is served at `/`.

## 3. Classify each page
- **LANDING**: public marketing pages (home/hero, features, pricing, about, contact, blog, FAQ, testimonials, careers, privacy/terms, 404/error, coming soon) and their navbar/footer layout.
- **DASHBOARD**: the app/admin area (overview, analytics, e-commerce/CRM, users, orders, products, invoices, calendar, kanban/tasks, chat, mail, file manager, profile, settings, notifications, charts, tables, forms, UI-element demo pages like buttons/alerts/modals, maps) and the sidebar/topbar layout.
- **AUTH**: sign in, sign up, forgot/reset password, verify email, two-step, lock screen.
- **UNSURE**: anything you can't classify with confidence.

Judge from the file's real content and imports, not only its name. Actions: LANDING → KEEP, DASHBOARD → DELETE, AUTH and UNSURE → ASK. AUTH is always ASK because landing buttons like "Sign in" or "Get started" often link to those pages.

## 4. Trace what the landing page really uses
- From every LANDING page and the root layout/entry, follow imports recursively (components, layouts, hooks, utils, contexts/providers, stores, services, types, styles, data files, icons, images, fonts). This is the keep list.
- Do the same from every DASHBOARD page. This is the dashboard list.
- In both lists → KEEP (shared). Only in the dashboard list → DELETE. In neither → UNUSED (report only, don't decide).
- Before marking a file DELETE, Grep for its file name, its export names and its import path. Templates often use path aliases from `tsconfig.json` or the bundler config, barrel `index` files, lazy imports, and string paths in CSS/JSON/config, so a file can look unused when it isn't.
- Root layout, `App`/`main` entry, providers, global CSS, Tailwind config, fonts and i18n are almost always KEEP, but can contain dashboard-only parts (for example a `SidebarProvider` wrapping the whole app). List those as EDIT with the exact change.

## 5. Packages and assets
- For each dependency, find where it is imported. List the ones used only by dashboard files (charts, calendars, data tables, maps, rich-text editors, drag-and-drop, date pickers, file upload...) as removal candidates. Never list packages used by landing files, config or build tooling.
- List images, icons and videos in `public/`, `assets/`, `static/` that only dashboard files use. If an asset could be loaded through a dynamic path, keep it.

## 6. Find what will break
Every link, button, redirect, middleware matcher, guard, sitemap entry or SEO config in the kept part that points to a dashboard or auth route. If `/` currently shows or redirects to the dashboard, say which landing page should become the new `/`.

## 7. Write `LANDING_CLEANUP_PLAN.md`
Use exactly these sections:
1. **Project overview**: table from step 1
2. **Folder tree**
3. **Pages**: `| Route | File | Category | Why | Action |`
4. **Landing sections found**: hero, features, pricing, testimonials, FAQ, CTA, footer... with file paths (reused later to build the new landing page)
5. **Files**: KEEP (landing-only), KEEP (shared), DELETE (dashboard-only), UNUSED, each with its path and evidence, e.g. "only imported by `src/pages/Dashboard/Home.tsx`"
6. **Files to edit**: path + exact change
7. **Packages to remove**: name + where it is used
8. **Assets to remove**
9. **Links, redirects and home route to fix**
10. **Risks**
11. **Questions for the user**: every ASK item and any other decision, each with your recommendation and an empty `Answer:` line
12. **Deletion checklist**: ordered `- [ ]` items with exact paths

## 8. Finish
Reply with a short summary: pages per category, number of files to keep/delete/edit, packages to remove, and the questions. Then stop and tell the user to review `LANDING_CLEANUP_PLAN.md`, fill in the `Answer:` lines (or change any Action), and run `/remove-dashboard`.
