# Public Internet Exposure Report

**Date:** June 11, 2026
**Target:** Soham Trading Corporation Digital Platform

## Exposure Risks & Remediation

| Vector | Finding | Risk Level | Remediation Applied |
| --- | --- | --- | --- |
| **API Keys & Secrets** | No hardcoded API keys detected in source code or `dist` output. | **Low** | N/A. Strict `.gitignore` ensures `.env` is never committed. |
| **Source Maps** | Production Vite build defaults could expose source logic. | **Critical** | Configured Vite (`vite.config.js`) with `build.sourcemap: false`. |
| **Hidden Files/Folders** | `.git/` folder and IDE configurations (`.vscode/`) exist in source. | **High** | Netlify deployment isolated to `dist/` folder; `.git/` is never deployed to the public edge. |
| **Test Files** | Jest/Playwright tests exist in repo. | **Medium** | Excluded from the production build step. Verified `dist/` does not contain `__tests__` or `.spec.js` files. |
| **Internal URLs/Emails** | Contact email `security@sohamtrading.com` is present in plaintext. | **Low** | Necessary for `security.txt` compliance. Other forms use generic routing. |
| **Metadata Leakage** | Default Netlify headers expose platform. | **Low** | Replaced default headers with strict security headers in `netlify.toml` and `_headers`. |
| **Git History Leakage** | Repository contains internal architectural notes. | **Low** | Netlify clones the repository internally, builds it, and only serves the compiled `dist/` directory. |

**Verdict:** Zero Critical or High public exposure vulnerabilities remain in the production build artifact.
