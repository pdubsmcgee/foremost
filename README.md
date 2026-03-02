# Foremost Machine, Inc. Marketing + Access Request Site

Astro + Tailwind static site for Foremost Machine, Inc.

## Features

- Public marketing pages (`/`, `/capabilities`, `/industries`, `/about`, `/contact`, `/request-access`)
- Commercial-only positioning statement
- FormSubmit form handling for Request Access and RFQ forms
- Private portal pages (`/portal`, `/portal/rfq`, `/portal/docs`) hidden from nav and guarded by shared password login (`/portal-login`)
- SEO basics: metadata, Open Graph image, sitemap integration, favicon, robots rules

## Tech Stack

- Astro (static output)
- Tailwind CSS
- GitHub Pages deployment via GitHub Actions

## 1) Install dependencies

```bash
npm install
```

## 2) Run locally

```bash
PUBLIC_PORTAL_PASSWORD=your-temp-password npm run dev
```

Open `http://localhost:4321`.

## 3) Deploy to GitHub Pages (Project Page mode)

This repository is configured to deploy on push to `main` using `.github/workflows/deploy.yml`.

### Required one-time GitHub setup

1. Push this repository to GitHub.
2. In **Repo Settings → Pages**, set **Source** to **GitHub Actions**.
3. In **Repo Settings → Secrets and variables → Actions**, add:
   - `PUBLIC_PORTAL_PASSWORD` = shared password for `/portal-login`.
4. Ensure your default deployment branch is `main` (or adjust workflow trigger).

### Expected URL for a project page

Project Pages deploy to a path under your user/org domain:

- `https://<github-username>.github.io/<repo-name>/`

This repo now builds with the correct base path automatically in GitHub Actions, so assets/routes resolve correctly on a project page.

## 4) DNS guidance if checks are failing

If you're using a **project page** (`github.io/<repo-name>`), you usually **do not need any DNS records** at all.

Use this checklist:

1. In **Repo Settings → Pages**, remove any custom domain value.
2. Ensure **Enforce HTTPS** is enabled only for the `github.io` URL.
3. Delete conflicting custom-domain files/records from previous setups (for this repo, the `CNAME` file was removed).
4. Re-run the Pages deploy workflow and wait a few minutes.

### When DNS records are needed

Only configure DNS if you want a custom domain (like `foremostmachineinc.com`).

If you switch back to a custom domain later, set:

- `A @ 185.199.108.153`
- `A @ 185.199.109.153`
- `A @ 185.199.110.153`
- `A @ 185.199.111.153`
- `CNAME www <your-github-username>.github.io`

If GitHub still says **DNS check unsuccessful** for a custom domain:

- Remove all extra `A`, `AAAA`, forwarding, or parking records on `@`.
- Ensure `www` points directly to `<your-github-username>.github.io` (not to apex).
- Confirm the exact same custom domain is entered in **Repo Settings → Pages**.
- Wait for propagation (often quick, but can take up to 24–48 hours).

### DNS records checklist (quick copy)

Use **only** the following records for apex + `www`:

| Type | Host | Value | TTL |
|---|---|---|---|
| A | @ | 185.199.108.153 | 1 hour (or default) |
| A | @ | 185.199.109.153 | 1 hour (or default) |
| A | @ | 185.199.110.153 | 1 hour (or default) |
| A | @ | 185.199.111.153 | 1 hour (or default) |
| CNAME | www | `<your-github-username>.github.io` | 1 hour (or default) |

Common problems if DNS "doesn't work":

- `www` CNAME points to the apex domain instead of `github.io`.
- Apex (`@`) has extra parking/forwarding/AAAA records still enabled.
- GitHub Pages custom domain is not set to `foremostmachineinc.com`.
- HTTPS is enforced before records have finished propagating.

## 5) Verify deployment

1. Push a commit to `main`.
2. Confirm the **Deploy Astro site to GitHub Pages** action succeeds.
3. Visit your project page URL:
   - `https://<github-username>.github.io/<repo-name>/`
4. If you later add a custom domain, re-add DNS records and set the domain in Pages settings.

## Important form-handling note

GitHub Pages is static hosting, so form submissions are handled by [FormSubmit](https://formsubmit.co/) endpoints configured in each form.

If you change inbox addresses, update the form `action` URLs in:

- `src/pages/request-access.astro`
- `src/pages/portal/rfq.astro`
