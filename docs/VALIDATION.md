# Validation

## Wix migration update — 2026-10-16

Validated in the cloud instance with Node 24 and system Chromium:

- ESLint, production build and TypeScript checks passed.
- All **13 Playwright tests passed**. Each of the five pages returned 200 without horizontal document overflow at widths of 320, 375, 768, 1024 and 1440 pixels. Mobile navigation passed. Contact validation and the explicit unconfigured-delivery response still passed.
- The homepage renders six featured designs in two desktop rows. The actual populated gallery rendered 43 designs. Category filtering passed for book covers, social media and email marketing. Lightbox next/previous navigation, Escape, original-file link and focus restoration passed.
- Every one of the 43 displayed portfolio images and both portrait images loaded successfully in Chromium.
- A separate 375px mobile check passed on the full-length email artwork: no document overflow, next/close controls, and keyboard focus containment including the new original-file link.
- Desktop homepage and mobile email-lightbox screenshots were visually inspected. Artwork retained its complete composition.
- All 45 downloaded originals decoded successfully for metadata/optimization and have unique SHA-256 hashes. Original files are unchanged; optimized WebP derivatives are separate.

Not verified: actual email provider delivery, a full screen reader audit, real iOS/Android hardware, or the updated Vercel deployment. The Vercel domain remains blocked from this execution environment, so a Git push alone does not establish that the public deployment completed. Missing source items and deliberately excluded Wix starter content are documented in MIGRATION.md.

## Collection arrangement update

The five Wix collection names, section order, counts (6/7/21/6/3), first artwork order and combined Designs & Logos filter passed automated checks. Desktop and mobile gallery screenshots were inspected after replacing mixed masonry with aligned category grids. The new gold logo is now installed using an image-tool-prepared version of the supplied attachment.

## Reference design implementation

The owner-supplied black, gold and cream reference has been applied across all five pages. Desktop (1440px) and mobile (390px) homepage screenshots were inspected with all images loaded. Existing responsive checks also cover 375px and 768px. A new functional check verifies the consultation CTA opens Contact, the verified business email has a working mailto link, and service links reach their corresponding sections. The six-tile showcase and four-step process are checked as part of that workflow. The hero/CTA use generated decorative desk imagery; portfolio previews and portraits remain the actual imported assets. The prepared logo follows the supplied attachment; it is not an original vector master or byte-identical source upload.

## Mockup and logo update

- All **13 browser tests passed** on the final mockup-enabled build, alongside ESLint, TypeScript and the production build.
- Every one of the 43 rendered presentations and all 43 original gallery images loaded successfully. Both portrait images still loaded.
- Both header and footer gold logo images loaded. The desktop header was visually inspected.
- Lightbox mockup/original switching, original-file links, next/previous navigation and Escape/focus restoration passed.
- The five Wix category headings, their order and counts (6/7/21/6/3) remain correct.
- All 45 original source SHA-256 hashes were rechecked and are unchanged.
- The ZIP passed its integrity check and contains 43 presentation PNGs, the prepared logo PNG and opening instructions.
- Representative book, sign, phone, desktop gallery and mobile lightbox presentations were visually inspected. All presentations are explicitly labeled as mockups; no posts, shops, installations or performance results are claimed.

Public Vercel redeployment remains unverified from this restricted execution environment. Pushing the GitHub branch is not proof that Vercel has finished rebuilding.

## Photographic featured-work upgrade

The six featured pieces now use photographic concept mockups based on their original assets. All six outputs were visually inspected for composition, legible main artwork and consistency with the warm dark-desk reference. Fine details are illustrative, with unmodified originals retained separately. The homepage test checks that all six featured thumbnails use the new photographic files. The remaining 37 presentations and the Wix category order are preserved. The archive was rebuilt to include the updated six.

All 13 tests passed on the photographic update, with production build, TypeScript and lint checks. Desktop and mobile featured-work screenshots were visually inspected. Six image-tool photographic concepts replace the former featured studio frames; original artwork files and hashes remain unchanged.
