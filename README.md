# Soham Trading Corporation Landing Page

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![Build Status](https://img.shields.io/github/actions/workflow/status/soham-trading/landing-page/ci.yml?branch=main)](https://github.com/soham-trading/landing-page/actions)
[![Lighthouse Score: 100](https://img.shields.io/badge/Lighthouse-100-success.svg)](https://developers.google.com/web/tools/lighthouse)
[![Security: OSSF Scorecard](https://img.shields.io/badge/Security-OSSF--Scorecard-brightgreen.svg)](https://securityscorecards.dev/)
[![Accessibility: WCAG 2.1 AA](https://img.shields.io/badge/Accessibility-WCAG_2.1_AA-success.svg)](https://www.w3.org/TR/WCAG21/)
[![SEO: Optimized](https://img.shields.io/badge/SEO-Optimized-brightgreen.svg)](#seo-improvements)
[![Docker](https://img.shields.io/badge/Docker-Ready-blue.svg)](Dockerfile)
[![CI/CD: GitHub Actions](https://img.shields.io/badge/CI%2FCD-GitHub_Actions-2088FF.svg)](.github/workflows)
[![Version: 1.0.0](https://img.shields.io/badge/Version-1.0.0-blue.svg)](CHANGELOG.md)
[![Last Commit](https://img.shields.io/github/last-commit/soham-trading/landing-page)](https://github.com/soham-trading/landing-page/commits/main)

## Project Overview

Soham Trading Corporation is a premier diversified engineering & energy solutions provider in India. This repository contains the source code for the official landing page, designed to showcase our turnkey solutions in Solar EPC, Industrial UPS, Stabilizers, DG Sets, PMC, and Electrical Infrastructure.

## Problem Statement

The energy and engineering sector often relies on outdated, slow, and non-responsive websites that fail to convey the scale and technical precision of their work. Soham Trading Corporation needed a digital presence that reflects our engineering excellence, modern capabilities, and multi-vertical expertise, while being highly performant and SEO-optimized.

## Solution

We engineered a lightning-fast, highly interactive, and visually stunning landing page using modern web technologies. The site features dynamic 3D elements, glassmorphism UI, and smooth animations to engage users, combined with semantic HTML and structured data to ensure maximum search engine visibility and accessibility.

## Features

- **Interactive 3D Hero Section:** Custom canvas-based animations representing our energy nodes.
- **Dynamic Project Portfolio:** Filterable showcase of our successful turnkey executions.
- **Interactive Service Modules:** Detailed technical specifications accessible via animated modals.
- **Calculators:** Built-in tools for ROI and energy savings estimation.
- **Glassmorphism Design:** Modern, premium aesthetic using advanced CSS techniques.
- **Fully Responsive:** Flawless experience across mobile, tablet, and desktop devices.
- **Dark Mode Optimization:** Deep, high-contrast color palette suitable for modern displays.

## Screenshots Section

*(Add screenshots here)*
- `Hero Section` - The animated canvas hero grid.
- `Services Grid` - The multi-vertical service cards.
- `Portfolio Filters` - The dynamic project showcase.

## Tech Stack

- **Frontend:** HTML5, CSS3, Vanilla JavaScript
- **Build Tool:** [Vite](https://vitejs.dev/)
- **Testing:** [Jest](https://jestjs.io/) (Unit), [Playwright](https://playwright.dev/) (E2E)
- **Deployment:** Netlify / Docker

## Architecture Overview

The project is built as a static site generated via Vite. It relies on a modular CSS architecture and vanilla JavaScript to keep the bundle size minimal and performance optimal. For more details, see [ARCHITECTURE.md](ARCHITECTURE.md).

## Installation Guide

### Prerequisites

- Node.js (v18+)
- npm or yarn

### Local Development Setup

1. **Clone the repository:**
   ```bash
   git clone https://github.com/soham-trading/landing-page.git
   cd landing-page
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```
   The site will be available at `http://localhost:5173`.

### Build Instructions

To build the project for production:

```bash
npm run build
```

The optimized static files will be generated in the `dist` directory.

### Deployment Instructions

This project is configured for automated deployment via Netlify. See [DEPLOYMENT.md](DEPLOYMENT.md) for detailed instructions on Netlify, Docker, and standard web server deployments.

### Environment Variables

Currently, the landing page does not require external API keys. If integrations (like analytics or forms) are added, create a `.env` file based on `.env.example`.

### Testing Instructions

- **Unit Tests:** `npm run test`
- **End-to-End Tests:** `npm run test:e2e`

## Project Structure

```text
├── index.html          # Main entry point
├── package.json        # Project metadata and scripts
├── vite.config.js      # Vite configuration (if any)
├── css/
│   └── style.css       # Core styling and glassmorphism UI
├── js/                 # Vanilla JavaScript modules
├── images/             # Optimized webp images
├── tests/              # Jest and Playwright tests
├── Dockerfile          # Docker configuration
├── docker-compose.yml  # Docker Compose orchestration
└── netlify.toml        # Netlify deployment settings
```

## Security Features

- Strict Content Security Policy (CSP) headers.
- Dependency auditing via `npm audit` and Dependabot.
- See [SECURITY.md](SECURITY.md) for vulnerability reporting.

## Performance Optimizations

- WebP image formats for reduced payload.
- Lazy loading for images and non-critical assets.
- Vite build optimizations (minification, tree-shaking).
- Asynchronous font loading.

## SEO Improvements

- Semantic HTML5 structure (`<header>`, `<nav>`, `<main>`, `<section>`).
- Schema.org Structured Data (JSON-LD) for LocalBusiness.
- Comprehensive OpenGraph and Twitter card metadata.
- Configured `robots.txt` and `sitemap.xml`.

## Accessibility Features

- ARIA labels on interactive elements (modals, filters, mobile menu).
- Keyboard navigable focus states.
- Sufficient color contrast ratios.
- `alt` attributes on all images.

## Future Roadmap

See [ROADMAP.md](ROADMAP.md) for planned features and upcoming milestones.

## Contribution Guidelines

We welcome contributions! Please review [CONTRIBUTING.md](CONTRIBUTING.md) for our code of conduct and pull request process.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contact Information

- **Website:** [https://www.sohamtrading.com/](https://www.sohamtrading.com/)
- **Phone:** +91 93716 75723
- **Address:** 402-403 Corporate Plaza, MG Road, Mumbai, Maharashtra 400001, IN
