// Render editable website scenes into portable mockup images without regenerating artwork.
// Prerequisite: npm run build, then npm start. Initial render uses projects without mockup metadata.
import { chromium } from "@playwright/test";
import sharp from "sharp";
import fs from "node:fs/promises";
import path from "node:path";
const root = process.cwd();
const projects = JSON.parse(
  await fs.readFile(path.join(root, "src/data/projects.json"), "utf8"),
);
if (projects.some((p) => p.mockup && p.mockup.method !== "photographic"))
  throw new Error(
    "Remove mockup fields temporarily and rebuild before regenerating scene images; do not screenshot an existing render. Preserve and restore metadata if rendering fails.",
  );
const browser = await chromium.launch({
  executablePath:
    process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH || "/usr/bin/chromium",
  args: ["--no-sandbox"],
});
try {
  const page = await browser.newPage({
    viewport: { width: 1440, height: 1100 },
    deviceScaleFactor: 3,
    reducedMotion: "reduce",
  });
  await page.goto("http://localhost:3000/portfolio", {
    waitUntil: "networkidle",
  });
  await page.mouse.move(0, 0);
  await page.addStyleTag({
    content: ".expand { visibility: hidden !important; }",
  });
  await fs.mkdir(path.join(root, "public/portfolio/mockups"), {
    recursive: true,
  });
  const manifest = [];
  for (const project of projects) {
    if (project.mockup?.method === "photographic") {
      manifest.push({
        id: project.id,
        title: project.title,
        original: project.original,
        ...project.mockup,
      });
      continue;
    }
    const scene = page.locator(
      `[data-project-id="${project.id}"] .mockup-scene`,
    );
    await scene.scrollIntoViewIfNeeded();
    await scene
      .locator("img")
      .evaluateAll((images) =>
        Promise.all(images.map((image) => image.decode())),
      );
    await page.evaluate(() => document.fonts.ready);
    const png = await scene.screenshot({ animations: "disabled" });
    const src = `/portfolio/mockups/${project.id}.webp`;
    const output = path.join(root, "public" + src);
    const meta = await sharp(png)
      .webp({ quality: 94, effort: 5 })
      .toFile(output);
    const kind = await scene.getAttribute("data-kind");
    project.mockup = { src, width: meta.width, height: meta.height, kind };
    manifest.push({
      id: project.id,
      title: project.title,
      original: project.original,
      ...project.mockup,
    });
    console.log(`Rendered ${project.title}`);
  }
  await fs.writeFile(
    path.join(root, "src/data/projects.json"),
    JSON.stringify(projects, null, 2) + "\n",
  );
  await fs.writeFile(
    path.join(root, "docs/mockup-manifest.json"),
    JSON.stringify(manifest, null, 2) + "\n",
  );
  console.log(
    `Rendered ${manifest.length} presentations. Rebuild to use the exported images.`,
  );
} finally {
  await browser.close();
}
