import { test, expect } from "@playwright/test";
for (const width of [375, 768, 1440]) {
  test(`navigation and layout at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    for (const path of ["/", "/about", "/services", "/portfolio", "/contact"]) {
      const response = await page.goto(path);
      expect(response?.status()).toBe(200);
      await expect(page.locator("h1")).toBeVisible();
      expect(
        await page.evaluate(
          () => document.documentElement.scrollWidth <= innerWidth,
        ),
      ).toBe(true);
    }
    if (width === 375) {
      await page.getByRole("button", { name: "Open navigation" }).click();
      await page
        .getByRole("navigation", { name: "Main navigation" })
        .getByRole("link", { name: "Portfolio", exact: true })
        .click();
      await expect(page).toHaveURL(/portfolio/);
    }
  });
}
test("contact validates and truthfully reports unavailable delivery", async ({
  page,
  request,
}) => {
  const bad = await request.post("/api/contact", { data: {} });
  expect(bad.status()).toBe(400);
  await page.goto("/contact");
  await page.getByLabel("Your name").fill("Example Visitor");
  await page.getByLabel("Email address").fill("visitor@example.com");
  await page
    .getByLabel("Service you’re interested in")
    .selectOption("Graphic Design & Branding");
  await page
    .getByLabel("Tell me about your project")
    .fill("I would like to discuss a new visual identity for my business.");
  await page.getByRole("button", { name: "Send your inquiry" }).click();
  await expect(page.getByRole("status")).toContainText(
    "Your message has not been sent",
  );
});
test("migrated gallery filters original artwork and supports the lightbox", async ({
  page,
}) => {
  await page.goto("/portfolio");
  await expect(page.locator(".project")).toHaveCount(43);
  await expect(page.locator(".portfolio-pending")).toHaveCount(0);
  await page.getByRole("button", { name: "Book Covers", exact: true }).click();
  await expect(page.locator(".project")).toHaveCount(6);
  const first = page.locator(".project").first();
  await first.click();
  const dialog = page.getByRole("dialog");
  await expect(dialog).toBeVisible();
  await expect(dialog).toHaveAccessibleName("Obedience — The Kingdom Culture");
  await page.keyboard.press("ArrowRight");
  await expect(dialog).toHaveAccessibleName("Live Not on Bread Alone");
  await page.getByRole("button", { name: "Previous image" }).click();
  await expect(dialog).toHaveAccessibleName("Obedience — The Kingdom Culture");
  const original = dialog.getByRole("link", {
    name: "Open full-resolution original",
  });
  await expect(original).toHaveAttribute("href", /book-covers.*\.png$/);
  await page.keyboard.press("Escape");
  await expect(dialog).toHaveCount(0);
  await expect(first).toBeFocused();
  await page
    .getByRole("button", { name: "Email Marketing Designs", exact: true })
    .click();
  await expect(page.locator(".project")).toHaveCount(6);
  await page
    .getByRole("button", { name: "Social Media Graphics", exact: true })
    .click();
  await expect(page.locator(".project")).toHaveCount(21);
  await expect(
    page.getByRole("button", { name: "Websites & Funnels", exact: true }),
  ).toHaveCount(0);
});
test("all migrated artwork and portraits load", async ({ page }) => {
  test.setTimeout(120000);
  await page.goto("/portfolio");
  const images = page.locator(".project img");
  for (let i = 0; i < 43; i++) {
    const image = images.nth(i);
    await image.scrollIntoViewIfNeeded();
    await expect(image).toBeVisible();
    await expect
      .poll(() =>
        image.evaluate((e) => {
          const img = e as HTMLImageElement;
          return img.complete && img.naturalWidth > 0;
        }),
      )
      .toBe(true);
  }
  for (const route of ["/", "/about"]) {
    await page.goto(route);
    const portrait = page.locator(".portrait-frame img");
    await portrait.scrollIntoViewIfNeeded();
    await expect
      .poll(() =>
        portrait.evaluate((e) => (e as HTMLImageElement).naturalWidth),
      )
      .toBeGreaterThan(0);
  }
});

test("homepage features six uncropped designs in a balanced showcase", async ({
  page,
}) => {
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto("/");
  const cards = page.locator(".preview-gallery .project");
  await expect(cards).toHaveCount(6);
  const tops = await cards.evaluateAll((nodes) =>
    nodes.map((e) => e.getBoundingClientRect().top),
  );
  expect(
    Math.max(...tops.slice(0, 3)) - Math.min(...tops.slice(0, 3)),
  ).toBeLessThan(2);
  expect(tops[3]).toBeGreaterThan(tops[0]);
});

test("collections follow the Wix categories and artwork order", async ({
  page,
}) => {
  await page.goto("/portfolio");
  await expect(page.locator(".portfolio-group h2")).toHaveText([
    "Book Covers",
    "Designs & Logos",
    "Social Media Graphics",
    "Email Marketing Designs",
    "Product Designs",
  ]);
  const groups = page.locator(".portfolio-group");
  for (const [i, count] of [6, 7, 21, 6, 3].entries())
    await expect(groups.nth(i).locator(".project")).toHaveCount(count);
  await expect(groups.nth(0).locator(".project").first()).toContainText(
    "Obedience",
  );
  await expect(groups.nth(1).locator(".project").first()).toContainText(
    "Ahria’s Adventure",
  );
  await page
    .getByRole("button", { name: "Designs & Logos", exact: true })
    .click();
  await expect(page.locator(".portfolio-group h2")).toHaveText([
    "Designs & Logos",
  ]);
  await expect(page.locator(".project")).toHaveCount(7);
});

test("mockup consultation and service links lead to working inquiry pages", async ({
  page,
}) => {
  await page.goto("/");
  await expect(page.locator(".hero h1")).toContainText("Creative Partner");
  await expect(page.locator(".compact-services .service")).toHaveCount(6);
  await expect(page.locator(".process li")).toHaveCount(4);
  await page
    .locator(".hero")
    .getByRole("link", { name: "Book a consultation" })
    .click();
  await expect(page).toHaveURL(/contact/);
  await expect(
    page.getByRole("link", { name: "jeanmonicarche@gmail.com", exact: true }),
  ).toHaveAttribute("href", "mailto:jeanmonicarche@gmail.com");
  await page.goto("/");
  await page
    .getByRole("link", { name: "Explore Social Media Management" })
    .click();
  await expect(page).toHaveURL(/services#social-media$/);
  await expect(page.locator("#social-media")).toBeInViewport();
});
