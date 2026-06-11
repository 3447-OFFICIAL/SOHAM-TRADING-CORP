# Frequently Asked Questions (FAQ)

## Technical FAQs

### Why Vanilla JavaScript instead of React/Vue?
For a landing page whose primary goal is fast initial load and SEO visibility, a heavy JavaScript framework adds unnecessary overhead. Vanilla JS combined with Vite provides the perfect balance of developer experience and raw performance.

### How do I update the portfolio projects?
Currently, projects are rendered via HTML in `index.html`. To add a new project, duplicate an existing `.project-card` block and update the image, title, and data attributes. We plan to move this to a CMS in the near future (see [ROADMAP.md](ROADMAP.md)).

### How is the 3D Canvas Hero generated?
The hero background uses the HTML5 `<canvas>` API with a custom particle system written in `js/canvas.js` (or inline). It simulates anti-gravity nodes representing our energy verticals. It automatically pauses when out of view to save battery/CPU.

### Is the contact form connected to a database?
In this static version, the contact form relies on a serverless provider (like Netlify Forms) or redirects to WhatsApp. There is no SQL database attached to this repository.

### How do I configure Netlify deployments?
The `netlify.toml` file in the root directory handles all configuration. Simply link your GitHub repo to a Netlify site, and it will deploy the `dist` folder automatically upon merging to the `main` branch.

## Business FAQs

*(For inclusion in the actual website UI later)*

### What areas does Soham Trading Corporation serve?
We execute turnkey projects Pan-India, with a strong focus on industrial corridors in Maharashtra, Gujarat, Karnataka, and the NCR region.

### Do you handle government regulatory approvals?
Yes. Our PMC and EPC teams handle all end-to-end documentation, grid synchronization approvals (net-metering), and electrical inspectorate clearances.
