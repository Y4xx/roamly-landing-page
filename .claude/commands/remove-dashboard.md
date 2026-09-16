---
description: Delete the dashboard using LANDING_CLEANUP_PLAN.md, keep only the landing page, then check that the project still builds.
argument-hint: "[optional answers, e.g. delete the auth pages too]"
disable-model-invocation: true
---

# Remove the dashboard, keep only the landing page

Execute `LANDING_CLEANUP_PLAN.md` (project root). Goal: a project that contains only the landing page and what it needs, still builds and runs, and is ready for building a new landing page.

User answers / notes (may be empty): $ARGUMENTS

## 0. Before deleting anything
1. If `LANDING_CLEANUP_PLAN.md` is missing, stop and tell the user to run `/analyze-project` first.
2. Read the whole plan. The user may have edited it: the Action values, the `Answer:` lines and the notes above win over your own opinion. If a question is still unanswered, ask all open questions in one message and wait. Never delete an ASK or UNSURE item without an answer.
3. Git safety net, so everything can be restored:
   - Not a git repo: make sure a `.gitignore` excludes `node_modules` and build folders, then `git init`, `git add -A`, `git commit -m "Backup before removing dashboard"`.
   - Uncommitted changes: show them and ask whether to commit them first. Never discard them.
   - Create and switch to a new branch `landing-only` (if it already exists, ask). Never push, force, or rewrite history.
4. Check that the plan is still true: every listed path exists, and nothing marked DELETE is imported by a file that stays (Grep again). If it is, keep it and note it.
5. Install dependencies if `node_modules` is missing, then run the build (or typecheck) once and note the errors that already exist. This is the baseline.

## 1. Delete
Work through the deletion checklist in order and tick each item `[x]` in the plan:
1. Dashboard pages and route folders, with their layouts and loading/error files.
2. Dashboard layouts: sidebar, app header/topbar, breadcrumbs...
3. Dashboard-only components, hooks, contexts/stores, services, API routes, mock data, types and styles, plus their tests and stories.
4. AUTH pages, only if the answers say so.
5. Dashboard-only assets.

Use `git rm -r <path>`. Delete only paths from the plan or confirmed by the user. Never delete config files, the root layout/entry, global styles, or anything outside the project.

## 2. Repair what stays
1. Router config: remove the routes of deleted pages.
2. Root layout / entry / providers: remove dashboard-only providers and wrappers; keep what the landing page uses (theme, fonts...).
3. Home route: make `/` show the landing page. Move the landing page to the root route if the plan says so, remove redirects to the dashboard, update middleware matchers and guards.
4. Landing links and buttons that pointed to deleted routes: point them to `#` or to a section anchor such as `#pricing` and add a `TODO` comment. Keep the buttons.
5. Remove unused imports, re-exports of deleted files (barrel `index` files) and empty folders.
6. Tailwind/CSS: remove only what clearly belonged to deleted files (content paths to deleted folders, dashboard-only plugins). Keep theme colors, fonts and everything the landing page uses.
7. Packages from the plan: Grep once more for zero usage in the remaining code and config, then uninstall them with the project's package manager (npm, pnpm, yarn or bun, from the lockfile). If unsure, keep the package and report it.

Do not redesign, rename or refactor the landing page, and do not add features: the new landing page is built in a later step, and a clean diff is easier to review.

## 3. Verify
1. Run typecheck (`npx tsc --noEmit` for TypeScript), lint and build, when they exist.
2. Fix every new error caused by the removal and run the checks again until they pass. Don't fix baseline errors; report them.
3. Grep the remaining code for `dashboard`, `admin`, `sidebar` and the names of deleted routes and components. Clean real leftovers; report anything kept on purpose.
4. Plain HTML template: check that no remaining page links to a deleted page, script or stylesheet.

## 4. Report
1. Add a `## Cleanup result` section to `LANDING_CLEANUP_PLAN.md`: files deleted, files edited (and what changed), packages removed, TODOs left, check results.
2. Commit on `landing-only`: `git add -A`, then `git commit -m "Remove dashboard, keep landing page only"`.
3. Reply with a short summary, the new folder tree, the remaining pages, and the command to start the dev server so the user can check the landing page in the browser.
