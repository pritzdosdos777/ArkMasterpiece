# Wix portfolio migration

Source: https://jeanmonicarche.wixsite.com/jean-monica-dosdos

## Completed import — 2026-10-16

Access now succeeds. Downloaded **45 original files** from the publicly served Wix media URLs: **43 design/logo images and two professional photos**. All 45 files have different SHA-256 hashes. Original PNG/JPEG files are retained in `public/portfolio`; corresponding WebP files are used for the website. WebP images are resized proportionally to a maximum width of 2400px, without enlarging smaller files. No original design is cropped. The lightbox offers a link to each full-resolution original.

The portfolio now contains:

| Category                |  Items |
| ----------------------- | -----: |
| Book Covers             |      6 |
| Designs & Logos         |      7 |
| Social Media Graphics   |     21 |
| Email Marketing Designs |      6 |
| Product Designs         |      3 |
| **Total**               | **43** |

The homepage features six original pieces selected across the existing categories. Its About preview uses the studio photo; the About page uses the second portrait. The pink and blue **Ark Designs** logos remain portfolio artwork. They are not presented as a replacement permanent logo for **Ark Masterpiece**.

`docs/wix-assets.json` records each source URL/page, source filename, original dimensions, local original, optimized version, byte size, and original SHA-256. `src/data/projects.json` contains the editable gallery content. Titles and alt text describe the visible art; no project outcomes, client endorsements, or testimonials have been invented.

## Public pages inspected

- Homepage, including every rendered artwork section.
- `/about-9`.
- `/portfolio`.
- All six linked `/portfolio-collections/my-portfolio/project-title-1` through `project-title-6` pages.
- Source media references in those pages, checked against the rendered image list.

The portfolio collection and its six project detail pages contain Wix starter material: the literal title “Project Title,” “Photography,” “April 2023,” “Create Your First Project,” and instructions to add a project description. Their 42 distinct `8bb438_…` images were excluded as template photography with unverified ownership, rather than presented as Jean Monica's work. Wix social icons and generic stock images such as “Remote Team Meeting” were also excluded. The About page's stock background video was excluded.

The public sitemap path returned Wix's 404 page; discovery used public navigation and linked project pages instead. No authentication, access controls, or download restrictions were bypassed.

## Missing / unavailable

1. `small.png`: the source references `https://static.wixstatic.com/media/fda5a1_e5a2bbc6f73b456e8d591df3ecaf9fb7~mv2.png`. Both its original URL and the exact publicly referenced rendered URL returned HTTP 403. Its contents could not be inspected.
2. An older image named in the header element's title, `fda5a1_ef41754824e7413d9e9cc478c3cd56f2~mv2.png`, also returned HTTP 403. The actual rendered header image is a different, successfully imported Ark Designs logo. The inaccessible reference may be obsolete; its contents remain unverified.
3. The homepage has a “Showreel” heading but no playable owner video, iframe, or direct video file in its served content. No owner showreel was imported. The only video reference found was a Wix stock background on About.
4. No website/funnel screenshots or linked owner website projects were found in the inspected public portfolio. No such category is shown.

If the two inaccessible assets or a showreel are wanted, supply the original files directly. No other source-linked owner artwork download failed.

## Maintenance

To update a gallery item, edit `src/data/projects.json`. `image` points to the optimized WebP; `original` points to the untouched source PNG/JPEG. Use actual pixel dimensions for the image being rendered. Set `featured: true` on exactly six items to control the homepage selection. Retain aspect ratios and use truthful descriptions. See README for more detail.

## Gallery arrangement

Collections now follow the exact five Wix section names and their order. Within each collection, artwork follows its source sequence. The additional pink Ark Designs logo from the source header is placed last in Designs & Logos. Each section has its own heading and item count. Balanced row grids replace the mixed masonry view; consistent frames use `object-fit: contain` and preserve all artwork. The category filter and lightbox remain available.

The new gold-on-black Ark Masterpiece logo was shown inline in chat but has not been delivered to the execution workspace as a retrievable file. Installing that exact artwork remains pending a PNG/JPG attachment; it has not been recreated or replaced with a generated approximation.
