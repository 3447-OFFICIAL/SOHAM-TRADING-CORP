# Incident Response Plan

## Scope
This plan covers incidents related to the Soham Trading Corporation static website, including DDoS attacks, defacement, domain hijacking, and third-party script compromise.

## Incident Severity Levels
- **SEV-1 (Critical):** Website is entirely down, domain hijacked, or actively serving malicious content (e.g., Supply Chain attack via NPM).
- **SEV-2 (High):** Major visual degradation, forms not submitting, CSS/JS failing to load.
- **SEV-3 (Medium):** Minor typos, single image failure, or non-critical 3rd party script failure.

## Response Procedures

### Scenario A: Website Offline / DDoS
1. Check Netlify Status Page. If Netlify is down, await their resolution.
2. If Netlify is up, check Cloudflare/DNS provider. Enable Cloudflare "Under Attack Mode" to mitigate Layer 7 DDoS.

### Scenario B: Defacement / Malicious Code Injection
1. Immediately roll back to the last known good deployment in the Netlify Dashboard (1-click rollback).
2. Lock down GitHub repository. Force password rotation and mandate 2FA for all developers.
3. Review GitHub Actions logs for compromised secrets.
4. Audit NPM dependencies (`npm audit`) to identify compromised packages.

### Scenario C: Domain Expiration/Hijacking
1. Contact domain registrar immediately.
2. Verify WHOIS records and enforce Registrar Lock and Domain Privacy.
