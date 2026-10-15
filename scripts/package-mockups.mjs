import fs from "node:fs/promises";
import path from "node:path";
import { execFileSync } from "node:child_process";
import sharp from "sharp";
const root = process.cwd();
const projects = JSON.parse(
  await fs.readFile(path.join(root, "src/data/projects.json"), "utf8"),
);
const exportRoot = path.join(root, ".mockup-exports");
await fs.mkdir(exportRoot, { recursive: true });
for (const project of projects) {
  if (!project.mockup) throw Error("Render every mockup before packaging.");
  const folder = path.join(exportRoot, project.category);
  await fs.mkdir(folder, { recursive: true });
  const name = project.title
    .normalize("NFKD")
    .replace(/[^a-zA-Z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
  await sharp(path.join(root, "public" + project.mockup.src))
    .png()
    .toFile(path.join(folder, name + ".png"));
}
await fs.mkdir(path.join(exportRoot, "Brand Logo"), { recursive: true });
await sharp(path.join(root, "public/brand/ark-masterpiece-logo.webp"))
  .png()
  .toFile(path.join(exportRoot, "Brand Logo/Ark-Masterpiece-prepared.png"));
await fs.writeFile(
  path.join(exportRoot, "START HERE.txt"),
  "ARK MASTERPIECE — MOCKUP COLLECTION\n\n43 portfolio presentation images, organized like the Wix portfolio, plus a prepared version of the supplied gold logo. Open any PNG to view it.\n\nThese are concept presentations using the original artwork on illustrative books, signs, frames, and devices. They do not establish actual print production, store installation, live social posts or campaign performance. The original artwork is preserved separately on the website. The apparel designs already contained garment mockups and are presented as concept displays.\n\nThe logo asset was prepared from the inline chat attachment with the image tool. It is not the original uploaded PNG or a vector master.\n",
);
const output = path.join(
  root,
  "downloads/Ark-Masterpiece-Mockup-Collection.zip",
);
await fs.mkdir(path.dirname(output), { recursive: true });
execFileSync("python3", [
  "-c",
  'import sys,zipfile,pathlib\nr=pathlib.Path(sys.argv[1])\nwith zipfile.ZipFile(sys.argv[2],"w",zipfile.ZIP_DEFLATED) as z:\n for p in sorted(r.rglob("*")):\n  if p.is_file(): z.write(p,p.relative_to(r))',
  exportRoot,
  output,
]);
console.log(
  "Packaged 43 mockup PNGs, a prepared logo and opening instructions.",
);
