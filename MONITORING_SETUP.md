# Production Monitoring Setup

## 1. UptimeRobot (Uptime Monitoring)
1. Create a free account at UptimeRobot.
2. Add a new Monitor:
   - **Type:** HTTPS
   - **URL:** `https://www.sohamtrading.com`
   - **Monitoring Interval:** 5 minutes
3. Set up Alert Contacts (Email/SMS) to notify the DevOps team if the site returns a 4xx/5xx status code or times out.

## 2. Sentry (Error Tracking)
1. Create a project in Sentry (Browser JavaScript).
2. Install the Sentry SDK via NPM or CDN in `index.html`.
3. Configure `Sentry.init({ dsn: 'YOUR_DSN', tracesSampleRate: 1.0 });`
4. Since this is a static site, Sentry will primarily catch unhandled Promise rejections and DOM exceptions caused by third-party scripts or ad-blockers.

## 3. Google Analytics 4 (Traffic Monitoring)
1. Create a GA4 property.
2. Add the provided GTAG script to the `<head>` of `index.html`.
3. **Critical Security Update:** If GA4 is added, you MUST update the `netlify.toml` CSP to include `https://www.googletagmanager.com` and `https://www.google-analytics.com` in the `script-src` and `connect-src` directives, otherwise the analytics will be blocked by the browser.

## 4. Cloudflare Analytics
1. Once DNS is moved to Cloudflare (Phase 8), Cloudflare Web Analytics can be enabled with a single click in the Cloudflare dashboard.
2. Benefit: Cloudflare Analytics does not use client-side cookies and perfectly respects user privacy (GDPR compliant out of the box), making it a superior alternative to GA4 for simple traffic counting.
