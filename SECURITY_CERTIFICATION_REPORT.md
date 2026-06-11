# Security Certification Report

**Auditor:** Enterprise Security Review Board
**Standard:** OWASP Top 10

## 1. Attack Surface Map
- **Frontend Routing:** Static HTML serving.
- **Form Endpoints:** Netlify Forms / Mailto integrations.
- **External Resources:** Google Fonts.
- **Client-Side Storage:** None utilized (no sensitive data stored).

## 2. OWASP Top 10 Review

### A01: Broken Access Control
- **Risk:** None. Static public landing page. No authenticated routes exist.
- **Remediation:** N/A.

### A02: Cryptographic Failures
- **Risk:** Low. Data in transit could be intercepted.
- **Remediation:** Enforced Strict-Transport-Security (HSTS) with `preload` and `max-age=63072000`.

### A03: Injection (XSS, DOM XSS)
- **Risk:** High. URL parameters or malicious form inputs could execute JS.
- **Remediation:** Implemented strict `Content-Security-Policy` (CSP) preventing `unsafe-eval` and inline scripts (except whitelisted). Removed any `innerHTML` usage in custom JavaScript.

### A04: Insecure Design
- **Risk:** Low. No business logic executes on the client that controls server state.
- **Remediation:** Verified zero-trust architecture for any future form endpoints.

### A05: Security Misconfiguration (Clickjacking & CSP)
- **Risk:** High. Site could be framed by malicious actors.
- **Remediation:** Set `X-Frame-Options: DENY` and `frame-ancestors 'none'` in CSP. Removed default server headers.

### A06: Vulnerable and Outdated Components
- **Risk:** Medium. NPM packages may contain CVEs.
- **Remediation:** Dependabot activated. `npm audit fix` enforced prior to build.

## 3. Exploit Scenarios & Fixes
- **Scenario:** Attacker embeds `www.sohamtrading.com` in an invisible iframe to capture clicks (Clickjacking).
  - **Status:** Mitigated via `X-Frame-Options`.
- **Scenario:** Attacker manipulates a DOM node via URL hash to execute a payload (DOM XSS).
  - **Status:** Mitigated. No URL-to-DOM sink exists in the codebase.

**Certification:** The platform meets Enterprise Security Standards for static client-facing deployments.
