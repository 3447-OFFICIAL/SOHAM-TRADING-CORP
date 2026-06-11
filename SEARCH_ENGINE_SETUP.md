# Search Engine & Discoverability Setup

This document outlines the SEO configuration and actions required to ensure maximum visibility for Soham Trading Corporation across major search engines.

## 1. Schema.org JSON-LD (LocalBusiness)
The `index.html` file has been injected with the following structured data to ensure Google properly indexes the company location, services, and contact info:

```json
{
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "Soham Trading Corporation",
  "image": "https://www.sohamtrading.com/images/logo.webp",
  "url": "https://www.sohamtrading.com/",
  "telephone": "+919371675723",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "402-403 Corporate Plaza, MG Road",
    "addressLocality": "Mumbai",
    "addressRegion": "Maharashtra",
    "postalCode": "400001",
    "addressCountry": "IN"
  }
}
```

## 2. Google Search Console Setup
1. Go to [Google Search Console](https://search.google.com/search-console).
2. Add Property -> Select **Domain** type.
3. Enter `sohamtrading.com`.
4. Copy the TXT record provided by Google.
5. Add the TXT record to your DNS provider (Cloudflare/Namecheap).
6. Once verified, navigate to **Sitemaps** and submit `https://www.sohamtrading.com/sitemap.xml`.

## 3. Bing Webmaster Setup
1. Go to [Bing Webmaster Tools](https://www.bing.com/toolbox/webmaster).
2. Use the "Import from Google Search Console" feature to automatically sync verification and sitemaps.

## 4. Google Business Profile
1. Claim the business at [Google Business Profile](https://www.google.com/business/).
2. Ensure the NAP (Name, Address, Phone) perfectly matches the Schema.org JSON-LD in `index.html`.
3. Add photos of completed Solar EPC and DG Set installations.
