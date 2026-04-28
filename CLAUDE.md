# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm start          # Dev server at http://localhost:4200
npm run build      # Production build
npm run watch      # Incremental dev build (watch mode)
npm test           # Unit tests via Karma/Jasmine
npm run serve:ssr:book-list  # Run SSR server after build
```

To run a single test file, use:
```bash
npx ng test --include='src/app/book/**/*.spec.ts'
```

## Architecture

Angular 17 application with SSR enabled and Bootstrap 5 for styling. The app displays a book catalog fetched from a REST API.

**API backend:** `http://localhost:8080/api/` (configured in `src/environments/environment.development.ts`). The backend must be running separately.

**Module structure:**
- `AppModule` — root module; imports `BookModule` and `EditorialModule`
- `BookModule` — primary feature; contains `BookListComponent`, `BookDetailComponent`, `BookService`, and data models
- `EditorialModule` and `AuthorModule` — scaffolded but empty; intended for future features

**Data flow:**
1. `BookService` fetches `Observable<BookDetail[]>` from `GET /api/books`
2. `BookListComponent` subscribes on `ngOnInit`, stores results, renders a Bootstrap card grid
3. Clicking a book sets `selectedBook`; `BookDetailComponent` receives it via `@Input` and renders details

**Model hierarchy:**
- `Book` (base) → `BookDetail` (extends with `authors: Author[]` and `reviews: Review[]`)
- `Author`, `Editorial`, `Review` are plain TypeScript classes with explicit constructors

**HTTP:** Configured with `provideHttpClient(withFetch())` (Angular's fetch-based strategy, required for SSR compatibility).

**Routing:** `AppRoutingModule` exists but routes array is currently empty — navigation is handled by component composition, not the router.

**State management:** None. Selection state (`selected`, `selectedBook`) lives locally in `BookListComponent`.
