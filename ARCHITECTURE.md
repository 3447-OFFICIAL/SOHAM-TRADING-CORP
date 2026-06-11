# Architecture Overview

## Design Philosophy

The Soham Trading Corporation Landing Page is engineered for maximum performance, SEO visibility, and high user engagement. Instead of relying on heavy frontend frameworks, we chose a **Vanilla JavaScript + HTML5/CSS3** stack, bundled and optimized using **Vite**. This ensures zero runtime overhead for framework parsing, delivering an ultra-fast Time to Interactive (TTI) and perfect Lighthouse scores.

## Component Breakdown

### 1. HTML5 Structure (`index.html`)
- **Semantic Tags:** Uses `<header>`, `<main>`, `<section>`, `<article>`, `<nav>` for accessibility and SEO.
- **Structured Data:** Inlines JSON-LD for `LocalBusiness` to enhance local SEO.
- **Lazy Loading:** `loading="lazy"` attributes on images outside the viewport.

### 2. Styling (`css/style.css`)
- **Glassmorphism:** Employs CSS backdrop-filters (`backdrop-filter: blur()`) to create frosted glass effects.
- **CSS Variables (Custom Properties):** Theming and design tokens are managed via root variables (e.g., `--color-primary`, `--border-glass-glow`).
- **Responsive Grid/Flexbox:** Utilizes fluid layouts to support mobile, tablet, and desktop screens without media query bloat.

### 3. Logic (`js/`)
- **Modularity:** JavaScript is divided into functional modules (e.g., animations, modal handlers, calculator logic).
- **Canvas API:** The hero section uses native `<canvas>` for high-performance, particle-based 3D visual effects.
- **Intersection Observers:** Used to trigger fade-in animations only when elements enter the viewport, saving CPU cycles.

### 4. Build System (Vite)
- **Fast HMR:** Hot Module Replacement during development.
- **Production Optimization:** Vite's build command uses Rollup to minify CSS/JS, compress images, and generate cache-busted asset names.
- **Asset Handling:** Automatically resolves paths and handles WebP generation.

## Data Flow

As a static landing page, there is no persistent backend database connection required at runtime.
1. **User Request:** Cloud CDN (Netlify) serves the pre-built HTML/CSS/JS.
2. **Client-Side:** JavaScript initializes the canvas animation and event listeners.
3. **Form Submission:** (If applicable) Contact forms use a serverless function endpoint or a service like Netlify Forms / Formspree to route emails without exposing SMTP credentials.

## Testing Strategy
- **Unit Tests (Jest):** Verifies pure JavaScript functions (e.g., calculator formulas).
- **E2E Tests (Playwright):** Validates the critical user journeys, such as modal interactions and responsive layout rendering.
