# Foremost Machine, Inc. Marketing + Access Request Site

Astro + Tailwind static site built for Netlify deployment with Netlify Forms and a simple password-protected portal for approved commercial customers.

## Features

- Public marketing pages (`/`, `/capabilities`, `/industries`, `/about`, `/contact`, `/request-access`)
- Commercial-only positioning statement
- Netlify Forms:
  - Request Access form
  - Contact form
  - Portal RFQ form (includes optional file upload)
- Private portal pages (`/portal`, `/portal/rfq`, `/portal/docs`) hidden from nav and guarded by shared password login (`/portal-login`)
- SEO basics: metadata, Open Graph image, sitemap integration, favicon, robots rules
- Netlify-ready `netlify.toml`

## Tech Stack

- Astro (static output)
- Tailwind CSS
- Netlify Forms (no custom backend)

## 1) Install dependencies

```bash
npm install
```

## 2) Run locally

```bash
PUBLIC_PORTAL_PASSWORD=your-temp-password npm run dev
```

Open `http://localhost:4321`.

## 3) Deploy to Netlify (Git-based deploy)

1. Push this repository to GitHub/GitLab/Bitbucket.
2. In Netlify, click **Add new site** → **Import an existing project**.
3. Select your repo.
4. Build settings:
   - **Build command**: `npm run build`
   - **Publish directory**: `dist`
5. Add environment variable in Netlify site settings:
   - `PUBLIC_PORTAL_PASSWORD` = shared password you will email to approved customers.
6. Trigger deploy.

## 4) Verify Netlify Forms submissions

After first deploy, submit each form once from the live site so Netlify detects all form schemas:

- `/request-access`
- `/contact`
- `/portal/rfq`

Then verify in Netlify dashboard:

- **Site configuration** → **Forms** (or **Forms** tab)
- You should see `request-access`, `contact`, and `portal-rfq`.

## 5) Configure portal protection method (implemented: password env var)

This MVP uses a shared password flow:

- Login page: `/portal-login`
- Protected pages: `/portal`, `/portal/rfq`, `/portal/docs`
- Users who have not logged in (or whose 8-hour session expired) are redirected to `/portal-login`.

### Security note

This is intentionally lightweight and suitable for an MVP with non-sensitive portal content. It is **not** equivalent to enterprise authentication/authorization.

## 6) Where to view submissions in Netlify dashboard

- Access requests: Form name `request-access`
- Contact messages: Form name `contact`
- RFQs: Form name `portal-rfq`

Navigate to **Netlify Dashboard → Your Site → Forms**.

## Netlify Forms implementation notes

Each form includes required Netlify attributes:

- `name="..."`
- `method="POST"`
- `data-netlify="true"`
- hidden input: `<input type="hidden" name="form-name" value="..." />`
- honeypot field: `netlify-honeypot="bot-field"`

RFQ form includes `enctype="multipart/form-data"` for optional file uploads.
