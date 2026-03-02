# Foremost Machine, Inc. Static HTML Site

This repository now ships as a plain static HTML website (no Astro required).

## Run locally

```bash
npm run serve
```

Open `http://localhost:4321`.

## Project structure

- `index.html` and section folders (`about/`, `capabilities/`, etc.)
- `styles/site.css` for site styling
- static assets (`favicon.svg`, `og-image.svg`, `robots.txt`, sitemaps)

## Validation

```bash
npm run check:links
```

This validates that local `href` links in HTML files resolve to files in the repository.

## Deploy

Upload the repository contents (or built artifact) to any static host.
No build step is required.
