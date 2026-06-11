# SSL & TLS Strategy

## 1. Primary SSL (Netlify)
Netlify automatically provisions Let's Encrypt certificates.
- **Protocol:** TLS 1.2 and TLS 1.3 only (TLS 1.0 and 1.1 are completely disabled at the edge).
- **Renewal:** Fully automated. Requires zero developer intervention.

## 2. Strict Transport Security (HSTS)
To guarantee connections are never downgraded to HTTP, HSTS has been hardcoded into the `netlify.toml` headers.
- `Strict-Transport-Security: max-age=63072000; includeSubDomains; preload`
- Once the custom domain is active and functioning properly for 1 week, submit the domain to [hstspreload.org](https://hstspreload.org/) to hardcode the HTTPS requirement directly into Chrome, Firefox, Safari, and Edge browsers globally.

## 3. Cloudflare Universal SSL (If Used)
If passing traffic through Cloudflare, the SSL certificate presented to the end user will be a Cloudflare Universal SSL (Google Trust Services / Let's Encrypt). The traffic between Cloudflare and Netlify will be encrypted using Netlify's SSL certificate.
