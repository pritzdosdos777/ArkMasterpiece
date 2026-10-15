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
        .getByRole("navigation")
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
test("empty portfolio never represents placeholders as client work", async ({
  page,
}) => {
  await page.goto("/portfolio");
  await expect(page.getByText("Placeholder · no sample work")).toBeVisible();
  await expect(page.locator(".filters")).toHaveCount(0);
});
