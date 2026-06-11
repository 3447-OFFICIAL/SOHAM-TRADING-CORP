# Security Policy

## Supported Versions

Currently, the following versions of the Soham Trading Corporation Landing Page are supported with security updates.

| Version | Supported          |
| ------- | ------------------ |
| 1.0.x   | :white_check_mark: |
| < 1.0   | :x:                |

## Reporting a Vulnerability

Security is a top priority for Soham Trading Corporation. If you discover a security vulnerability within this project, please send an email to our Security Team at **security@sohamtrading.com**.

Please include the following information in your report:

- Type of issue (e.g., buffer overflow, SQL injection, cross-site scripting, etc.)
- Full paths of source file(s) related to the manifestation of the issue
- The location of the affected source code (tag/branch/commit or direct URL)
- Any special configuration required to reproduce the issue
- Step-by-step instructions to reproduce the issue
- Proof-of-concept or exploit code (if possible)
- Impact of the issue, including how an attacker might exploit the issue

We evaluate all reported vulnerabilities and will respond to your report within 48 hours to acknowledge receipt and provide a timeline for a resolution.

## Best Practices Implemented

- **Content Security Policy (CSP):** Implemented to prevent XSS and data injection attacks.
- **Dependency Auditing:** We regularly scan for vulnerable dependencies via `npm audit` and Dependabot.
- **Header Hardening:** Use of security headers (HSTS, X-Content-Type-Options).
- **Static Analysis:** Codeql is configured on GitHub actions.

We ask that you do not disclose the vulnerability publicly until we have released a fix.
