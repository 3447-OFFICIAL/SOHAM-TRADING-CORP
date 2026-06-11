# Deployment Guide

The Soham Trading Corporation Landing Page is optimized for continuous deployment via Netlify, but can be hosted on any static file server or via Docker.

## Option 1: Netlify (Recommended)

The project includes a `netlify.toml` file configured for instant deployments.

1. Create an account on [Netlify](https://www.netlify.com/).
2. Click "Add new site" -> "Import an existing project".
3. Connect your GitHub repository.
4. Netlify will automatically detect the settings:
   - **Build Command:** `npm run build`
   - **Publish Directory:** `dist`
5. Click **Deploy Site**.

Netlify handles SSL certificates, CDN distribution, and cache invalidation automatically.

## Option 2: Docker

For self-hosting or enterprise environments, a `Dockerfile` and `docker-compose.yml` are provided.

### Building the Image

```bash
docker build -t soham-landing-page .
```

### Running the Container

```bash
docker run -d -p 8080:80 soham-landing-page
```

### Using Docker Compose

```bash
docker-compose up -d
```

The site will be available on `http://localhost:8080`.

## Option 3: Standard Web Server (Nginx / Apache)

1. Build the static assets locally:
   ```bash
   npm run build
   ```
2. The `dist` folder will contain the production-ready files.
3. Copy the contents of the `dist` folder to your server's web root (e.g., `/var/www/html`).

### Nginx Configuration Example

```nginx
server {
    listen 80;
    server_name www.sohamtrading.com;
    root /var/www/html;
    index index.html;

    # Gzip compression
    gzip on;
    gzip_types text/css application/javascript image/svg+xml;

    location / {
        try_files $uri $uri/ /index.html;
        
        # Security headers
        add_header Content-Security-Policy "default-src 'self'; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com;";
        add_header X-Content-Type-Options "nosniff";
    }
}
```

## Post-Deployment Checklist

- [ ] Verify SSL certificate status.
- [ ] Test the contact form submission.
- [ ] Run Lighthouse in Chrome DevTools on the production URL.
- [ ] Submit the `sitemap.xml` to Google Search Console.
