# Ark Masterpiece

A responsive Next.js App Router portfolio with TypeScript, Tailwind CSS, Motion, Lucide, and a data-driven gallery. The owner has supplied a Vercel site address, https://ark-masterpiece.vercel.app/. Its live deployment is managed in Vercel; this environment cannot independently verify the current public version.

## Development

Requires Node.js 22+ and npm. Use the existing checkout; no worktree is necessary.

```sh
npm ci --cache /workspace/.npm-cache
npm run dev
```

Run `npm run lint`, `npm run typecheck`, `npm run build`, and `npm test`. Browser tests use `/usr/bin/chromium`; set `PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH` for another installation. After building, `npm start` serves production. Open the local server on port 3000 in a supported local development environment. Cloud onboarding has no public preview link.

## Structure and content

- `src/app`: Home, About, Services, Portfolio, Contact, metadata routes, server contact endpoint.
- `src/components`: shared navigation, sections, reveal animation, gallery and form.
- `src/data/content.ts`: contact information, social links, services, portrait paths, verified testimonials.
- `src/data/projects.json`: 43 imported portfolio designs and editable gallery descriptions.
- `public/portfolio`: owner-approved original artwork.
- `docs/MIGRATION.md`: migration status and asset handoff.

### Add portfolio artwork

1. Upload the original image under `public/portfolio/<category>/`. Suggested folders: book-covers, logos, social-media, email-marketing, product-designs, websites, videos.
2. Add a project object to the array in `src/data/projects.json`:

```json
{
  "id": "unique-id",
  "title": "Actual project title",
  "category": "Book Covers",
  "image": "/portfolio/book-covers/cover.webp",
  "original": "/portfolio/book-covers/cover.png",
  "alt": "Describe the actual artwork",
  "width": 1600,
  "height": 2400,
  "description": "Optional verified description"
}
```

Use actual pixel dimensions for the rendered image and descriptive alt text. Keep an untouched original and reference it using `original` so visitors can open it from the lightbox. Set `featured: true` on six projects to choose the homepage showcase. Images retain their proportions; no content is cropped. Only categories with real projects appear. Use the five Wix category names exactly: Book Covers, Designs & Logos, Social Media Graphics, Email Marketing Designs, Product Designs. Their display order is set in `portfolioCategories` in `src/data/content.ts`. Gallery buttons open the full image; Escape closes, arrow keys navigate, Tab stays in the dialog. Next Image creates optimized variants automatically. Do not put confidential or unlicensed work in public assets. Videos currently require a separate authorized hosted link or a future player integration; the current gallery supports images and video thumbnails only.

Update `site.email` and `site.socials` with verified contact details. Proposed services need owner confirmation. Add only verified testimonials to the typed array; otherwise the section remains clearly marked as draft. The shared brand component displays the prepared gold mark beside the business name. Fonts use a local system Georgia/Arial stack to avoid external font requests; licensed local font files can replace them later.

## Contact delivery

Copy `.env.example` to `.env.local` and configure server-only variables:

- `RESEND_API_KEY`: Resend API credential.
- `CONTACT_FROM_EMAIL`: verified sender on your Resend domain.
- `CONTACT_TO_EMAIL`: business inbox.
- `SITE_URL`: final canonical HTTPS origin, without a trailing slash.

Never use `NEXT_PUBLIC_` for credentials. Configure secrets securely in your deployment settings. With no provider configured the API returns 503 and explicitly says nothing was sent. Invalid input returns 400; provider failure returns 502. A success is shown only when Resend accepts the send request, which does not guarantee inbox delivery. Before public launch enable provider/domain authentication and deployment-level rate limiting or bot protection. The endpoint validates request origin and field lengths; it does not store submissions.

## Vercel preparation

The owner has authorized publishing and supplied the Vercel site address. Connect this GitHub feature branch in Vercel to deploy these updates. Framework preset: Next.js; install: `npm ci`; build: `npm run build`; output: default. Add the server environment variables above. Set `SITE_URL` to the approved domain so sitemap generation uses a real origin. Without it, sitemap is empty rather than publishing an invented URL. Metadata titles/descriptions and Open Graph title/description are included. Add a real branded social image after receiving approved artwork.

Before promoting the live site: review the migrated Wix artwork (43 pieces and two portraits; see migration report), confirm services and copy, supply the Ark Masterpiece logo/contact links, add privacy information appropriate to the chosen delivery provider, test real email delivery, and review desktop/mobile views. Do not publish placeholder work as finished portfolio content.

## Review / merge

Branch: `feat/ark-masterpiece-website` (pushed to GitHub). This was an empty repository with no `main` commit, so a pull request against `main` cannot yet be created. Review the feature branch directly on GitHub. After approval, initialize `main` from the reviewed feature branch:

```sh
git fetch origin
git switch -c main origin/feat/ark-masterpiece-website
git push -u origin main
```

Then select `main` as the default branch in GitHub repository settings. If a `main` branch has since been created, use a normal pull request instead and resolve any history differences deliberately. The owner subsequently authorized public deployment. Paid services remain unapproved. This environment has no Vercel project credentials and cannot verify deployment completion.

The offline ZIP in `downloads/` is an earlier review snapshot from before artwork migration. The website source and gallery are current; the ZIP is not a live-site backup.

## Black and gold design

The current design follows the owner-supplied reference: a dark editorial hero, champagne gold buttons, cream service panels, a six-item portfolio showcase, real founder portrait, four-step process and a photographic contact banner. The same colors, typography and navigation apply to all five pages. On mobile, the navigation collapses, services become stacked rows, and the work showcase becomes a two-column grid. Reduced-motion preferences remain supported.

`public/brand/studio-desk.webp` is a generated decorative studio scene, not client work or a real business premises. The actual portfolio and founder photos remain original Wix imports. The supplied gold logo is now displayed in the shared header and footer. `public/brand/ark-masterpiece-logo.webp` is an image-tool-prepared version of the inline attachment, not a byte-identical original upload or vector master. The full prepared mark and wordmark are included in the downloadable collection; the header/footer display its mark beside accessible typography.

The email address and Facebook, Instagram and LinkedIn links in `site` come from the public Wix contact/About sections. Consultation buttons lead to an inquiry page, not an automated calendar booking. Form delivery still requires configuration; visitors can use the published business email directly. Unverified testimonials are omitted from the homepage.

## Portfolio mockup presentations

All **43 portfolio items** use photographic concept mockups in `public/portfolio/mockups/photographic/`. The five Wix collections and their source order remain intact. The gallery defaults to mockups; “Original artwork” switches to the preserved designs. The fullscreen viewer has the same switch and a full-resolution original link.

- Book Covers: printed paperback presentations with realistic page edges.
- Designs & Logos: stationery, cards, and printed campaign posters.
- Social Media Graphics: real-looking phones presenting each original creative.
- Email Marketing Designs: laptop and tablet presentations.
- Product Designs: apparel presentations with fabric and print texture.

These are image-tool-generated photographic interpretations using the original artwork as reference, not actual client product shoots or byte-for-byte composites. Fine lettering, material texture and collateral details may vary. They do not establish real installations, live posts, engagement metrics or printed production. Original artwork remains authoritative. All original artwork files, dimensions and source hashes are unchanged. Portraits remain real photographs and are separate from these 43 creative mockups.

`docs/photographic-mockups.json` records the source and generated file for every item. `docs/mockup-manifest.json` maps the website export to its project. Each project's `mockup` metadata contains its path, dimensions, presentation kind and `method: "photographic"`. To replace a presentation, preserve the original artwork, create a new referenced image, optimize it as WebP, update the metadata and provenance, then rebuild and verify the gallery. Do not regenerate photographic images with the legacy studio renderer; it skips photographic entries.

### Download collection

Run `node scripts/package-mockups.mjs` to build `downloads/Ark-Masterpiece-Mockup-Collection.zip`. It contains all 43 optimized WebP presentations in the five category folders, the prepared logo as PNG, and opening instructions. WebP works in current browsers and image viewers; these are presentation-resolution images, not print-production masters or editable 3D files. The script uses Node, sharp and Python 3; temporary files go to ignored `.mockup-exports/`.
