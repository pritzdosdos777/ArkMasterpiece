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

## Complete photographic collection

All **43 portfolio presentations** now use image-tool-generated photographic concepts: 6 book covers, 7 designs/logos, 21 social graphics, 6 email designs and 3 apparel designs. The existing six featured photographs are retained; the remaining 37 have been replaced with individual referenced photographic outputs. A complete contact sheet was visually reviewed for composition, recognizable artwork and category suitability. Fine details remain illustrative; originals are authoritative. Corrected the Soul Detox caption to match the verified source text, “Let Your Mind Be Fixed.”

Validation on the complete set: production build, ESLint, TypeScript, and all **13 Playwright tests passed**. The gallery test now asserts that every card uses a photographic export. All 43 mockups, all 43 original artworks, both portraits, Wix category counts/order, filters, lightbox/original switching, navigation, logo, and honest contact behavior passed. The five page layouts passed overflow checks at 320, 375, 768, 1024 and 1440px. All 45 imported source-file SHA-256 hashes still match the migration audit.

The download archive passed ZIP integrity validation and contains 43 photographic WebP images in the five Wix categories, the prepared PNG logo and opening instructions (approximately 14.3 MB). WebP replaces the previous PNG presentation exports to keep the complete collection compact. The original PNG/JPEG artworks remain separate and unchanged. Public Vercel redeployment remains unverified; the Git push is not confirmation that Vercel has rebuilt the public site.

## Gmail actions, featured swaps and video section

Updated the header, hero and shared CTA labels to “Let’s work together.” These buttons, service inquiry arrows, the footer email icon and the visible contact email now use the shared Gmail compose URL addressed to jeanmonicarche@gmail.com, opening in a new tab. Contact navigation still reaches the contact page. The featured book is now The Power of Words and the featured Ahria logo has been replaced by Moses — Another Red Sea; all original artworks remain in the full gallery.

Production build, ESLint and TypeScript passed. All **15 Playwright tests passed**, including the five responsive widths, expected Gmail URL/recipient and new-tab behavior (Gmail requests intercepted in the test), both featured replacements and eight honestly pending video cards with no broken players. Gmail account login and actual message delivery were not tested.

Each of the eight submitted MP4 downloads failed with the executor's 32 MiB transfer-limit response. No video bytes were retrieved. The Video Editing section, data catalog and native playback/error handling are prepared, but all eight previews remain explicitly pending. Actual video decoding, audio, captions, seeking and fullscreen playback cannot be validated until retrievable files are supplied. See VIDEO-ADDITIONS.md. No video availability or public Vercel redeployment is claimed.


## Seven playable owner videos

The latest seven files were successfully retrieved. All were inspected and converted to browser-compatible H.264/AAC fast-start MP4, with full duration and portrait framing retained. Sierra 1 was converted from 60 fps to 30 fps. All seven have genuine poster frames extracted at two seconds. Source/output hashes and media information are recorded in `video-manifest.json`. The new seven-item catalog replaces the earlier pending cards without assuming correspondence to differently named unavailable uploads.

Production build, ESLint and TypeScript checks passed. All **20 Playwright tests passed**. Every video played and sought successfully at 1440px and 375px; displayed portrait proportions were verified. Poster loading and MP4 byte-range responses passed for all seven. Fullscreen entry/exit, pausing the previous clip when a new clip starts, and a simulated load failure with direct-open fallback passed. The existing Gmail, featured-work, artwork-gallery and five responsive-width checks remain passing. Browser playback used muted audio; AAC streams were verified in all output files, but audible output was not manually assessed. Tests ran in system Chromium; physical iOS/Android devices, Safari and a screen reader audit were not run. No separate caption files were supplied.

Public Vercel deployment remains unverified from this environment. Git push alone does not establish that Vercel finished rebuilding.

The completed video section was visually inspected in 1440px desktop and 375px mobile screenshots. The three-column desktop gallery and single-column mobile gallery show actual poster frames with preserved portrait proportions.

## Contact navigation, service catalog, motion and video filter

“Let’s work together” links in the header, hero and shared CTA now navigate to `/contact` in the current tab. Service inquiry links also reach Contact; the email address and email icon retain Gmail compose links. Social Media Management has been removed from the shared catalog, homepage/full service cards, form options and API whitelist. Existing social-media artwork remains in the portfolio. The homepage now shows five service previews and the Services page shows seven services.

The incoming page uses a short template-based fade/slide transition. Scroll reveals now fade and rise gently; the six homepage featured images enter from the right with staggered delays. Reduced-motion styles remove movement and keep content visible, and no-JavaScript styles make reveal content visible. The featured section clips animation overflow.

Removed the standalone “Explore video editing” jump link. Video Editing is a button in the main portfolio filter row. All Projects displays the 43 artworks plus seven videos; Video Editing displays only videos, and image categories exclude videos. The existing poster frames and playback controls remain intact.

Production build, lint and TypeScript checks passed. All **24 Playwright tests passed**, including five viewport widths, Contact navigation, Gmail email links, removed-service API rejection, motion/reduced-motion behavior, video filter switching, all seven video playback/seek checks at desktop/mobile widths, fullscreen, and the existing artwork interactions.

The new founder image is visible only as an inline chat image and has no downloadable attachment ID or local source file available to this environment. The current portrait remains unchanged. Replacement requires the exact JPG/PNG file; no generated portrait substitute has been created. Public Vercel deployment remains unverified.

The integrated Video Editing filter was visually reviewed at 1440px and 375px, alongside featured-work screenshots after the entrance animations completed.

## Founder photo resolved from ZIP

`Founder.zip` was retrieved successfully and contained `Founder.PNG` (1254×1254). The exact PNG is preserved at `public/brand/founder-original.png`; `public/brand/founder.webp` is an optimized WebP without generated edits or changes to composition. The homepage founder image, dimensions and alt text now reference this photo. The square portrait is displayed in full at desktop and mobile widths. The About-page image is separately configured. Source provenance and SHA-256 are recorded in `founder-photo.json`. This resolves the earlier inline-attachment blocker.

Production build, lint and TypeScript checks passed. All **6 targeted Playwright tests passed** (the five responsive navigation/layout checks and all image/portrait loading). The unchanged video tests were not rerun for this image-only update. Desktop 1440px and mobile 375px founder-section screenshots were visually inspected, and the rendered image was checked to remain square. Original PNG bytes match the file extracted from the ZIP. Public Vercel redeployment remains unverified.

## Transitions for every portfolio artwork

All 43 portfolio artwork cards now fade and slide in from the right on viewport entry. Full-gallery stagger delays reset in groups of three and are capped at 0.18 seconds, rather than accumulating across the full collection. Entrances replay when filters or the original/mockup view change. The fullscreen artwork uses a brief opacity transition when images or presentation modes change; only the artwork remounts, so the caption controls retain keyboard focus. Reduced-motion styles and the no-JavaScript visibility fallback cover all artwork cards. The full gallery clips horizontal animation overflow.

Production build, lint and TypeScript passed. All **15 targeted Playwright tests passed**, including all five responsive widths, artwork loading, existing filter/lightbox interactions, all 43 completed scroll entrances, original-view/filter changes, keyboard focus in the fullscreen viewer, mobile reduced motion and video filter availability. Video decoding/playback tests were not rerun for this artwork-animation change. Public Vercel deployment remains unverified.

## Updated About portrait

The latest owner-provided Founder.zip contained BC45DD0D-16B8-4D98-88A7-B254519D0CBD.PNG (1132×1390). The About page now uses the optimized `public/brand/about.webp`, with accurate dimensions and alt text. The untouched source is retained at `public/brand/about-original.png` and its SHA-256 is recorded in `about-photo.json`. The homepage founder portrait remains separately configured.

Production build, lint and TypeScript checks passed. All **6 targeted browser tests passed** (five responsive widths and image loading). About-page screenshots at 1440px and 375px were visually inspected; the complete portrait is visible without cropping. Unchanged video and animation suites were not rerun for this photo replacement. Public Vercel redeployment remains unverified.
