# Validation

## Wix migration update — 2026-10-16

Validated in the cloud instance with Node 24 and system Chromium:

- ESLint, production build and TypeScript checks passed.
- All **eight Playwright tests passed**. Each of the five pages returned 200 without horizontal document overflow at widths of 375, 768 and 1440 pixels. Mobile navigation passed. Contact validation and the explicit unconfigured-delivery response still passed.
- The homepage renders its three featured designs in one desktop row. The actual populated gallery rendered 43 designs. Category filtering passed for book covers, social media and email marketing. Lightbox next/previous navigation, Escape, original-file link and focus restoration passed.
- Every one of the 43 displayed portfolio images and both portrait images loaded successfully in Chromium.
- A separate 375px mobile check passed on the full-length email artwork: no document overflow, next/close controls, and keyboard focus containment including the new original-file link.
- Desktop homepage and mobile email-lightbox screenshots were visually inspected. Artwork retained its complete composition.
- All 45 downloaded originals decoded successfully for metadata/optimization and have unique SHA-256 hashes. Original files are unchanged; optimized WebP derivatives are separate.

Not verified: actual email provider delivery, a full screen reader audit, real iOS/Android hardware, or the updated Vercel deployment. The Vercel domain remains blocked from this execution environment, so a Git push alone does not establish that the public deployment completed. Missing source items and deliberately excluded Wix starter content are documented in MIGRATION.md.

## Collection arrangement update

The five Wix collection names, section order, counts (6/7/21/6/3), first artwork order and combined Designs & Logos filter passed automated checks. Desktop and mobile gallery screenshots were inspected after replacing mixed masonry with aligned category grids. The new logo is pending a retrievable attachment; no claim is made that it has been installed.
