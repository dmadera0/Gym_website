# Iron Box CrossFit

Modern marketing website for a CrossFit gym. Built with React + Vite, styled with Tailwind CSS, and deployed as a static site on AWS S3 + CloudFront.

## Stack

- **React 18** + **Vite 5** — SPA, static output
- **Tailwind CSS 3** — utility-first styling
- **Lucide React** — icons
- **Barlow Condensed / Barlow** — Google Fonts

## Pages / Sections

| Section | Description |
|---|---|
| Hero | Full-screen headline, CTAs, stats bar |
| About | Gym story, feature list, stat cards, coach profiles |
| Schedule | 7-day class grid with level badges (All / Rx / Scaled / Foundations) |
| Pricing | Drop-In · Monthly · Annual membership cards |
| Contact | Inquiry form, location, hours, Google Maps placeholder |
| Footer | Newsletter signup, quick links, social icons |

## Getting Started

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # production output → dist/
npm run preview    # preview the production build locally
```

## Deploying to AWS

Prerequisites: [AWS CLI v2](https://docs.aws.amazon.com/cli/latest/userguide/install-cliv2.html) installed and configured (`aws configure`).

```bash
./deploy.sh
```

**First run** — creates an S3 bucket, enables static website hosting, creates a CloudFront distribution (PriceClass_100 — US/EU), and prints the live `https://` URL.

**Subsequent runs** — uploads changed files and issues a CloudFront cache invalidation. Resource IDs are persisted in `.deploy-config` (git-ignored).

### Cache strategy

| File type | Cache-Control |
|---|---|
| HTML | `no-cache, no-store, must-revalidate` |
| JS / CSS / assets | `public, max-age=31536000, immutable` |

Vite content-hashes all assets, so the long cache on JS/CSS is safe — new deploys get new filenames.

## Customization Checklist

Before going live, update the following placeholder content:

- [ ] **Gym name & branding** — `index.html` (title/meta), [Navbar.jsx](src/components/Navbar.jsx), [Footer.jsx](src/components/Footer.jsx)
- [ ] **Coaches** — names, titles, certifications in [About.jsx](src/components/About.jsx); replace initials avatars with real photos
- [ ] **Class schedule** — times, class names, coaches in [Schedule.jsx](src/components/Schedule.jsx)
- [ ] **Pricing** — amounts and plan names in [Pricing.jsx](src/components/Pricing.jsx)
- [ ] **Contact info** — address, phone, email in [Contact.jsx](src/components/Contact.jsx)
- [ ] **Google Maps** — replace the placeholder `div` in [Contact.jsx](src/components/Contact.jsx) with an `<iframe>` embed from Google Maps
- [ ] **Contact form backend** — the form currently only shows a client-side success state; wire it to a service like [Formspree](https://formspree.io), AWS SES, or similar
- [ ] **Social links** — update `href="#"` placeholders in [Footer.jsx](src/components/Footer.jsx)
- [ ] **Favicon** — replace [public/favicon.svg](public/favicon.svg) with real logo

## Project Structure

```
├── public/
│   └── favicon.svg
├── src/
│   ├── components/
│   │   ├── Navbar.jsx
│   │   ├── Hero.jsx
│   │   ├── About.jsx
│   │   ├── Schedule.jsx
│   │   ├── Pricing.jsx
│   │   ├── Contact.jsx
│   │   └── Footer.jsx
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── deploy.sh          # AWS S3 + CloudFront deployment
├── index.html
├── tailwind.config.js
├── vite.config.js
└── postcss.config.js
```
