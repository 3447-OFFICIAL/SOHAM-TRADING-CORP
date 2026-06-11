# Cloudflare Setup Guide

Integrating Cloudflare in front of Netlify is possible but requires specific configurations to avoid redirect loops and broken SSL.

## 1. Add Site
Add `sohamtrading.com` to Cloudflare and change nameservers at your registrar to point to Cloudflare.

## 2. DNS Settings
- **A Record / CNAME:** Point `@` and `www` to `soham-trading.netlify.app.`.
- **Proxy Status:** Set to `Proxied` (Orange Cloud).

## 3. SSL/TLS Settings
- **Encryption Mode:** MUST be set to **Full (strict)**. If set to Flexible, Netlify will enforce HTTPS and cause an infinite redirect loop.
- **Always Use HTTPS:** Enabled.

## 4. WAF & Security
- Enable **Bot Fight Mode**.
- Create a WAF rule to block requests with high threat scores.
- Enable **Browser Integrity Check**.

## 5. Page Rules
- Disable Cloudflare's auto-minification (JS/CSS/HTML) as Vite already perfectly minifies the assets during `npm run build`. Double minification can break the site.
