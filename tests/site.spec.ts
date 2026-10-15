import { test, expect } from "@playwright/test";
for (const width of [320, 375, 768, 1024, 1440]) {
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
  for (const image of await page.locator(".project img").all())
    await expect(image).toHaveAttribute("src", /mockups.*photographic/);
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
test("all mockups, original artwork, and portraits load", async ({ page }) => {
  test.setTimeout(120000);
  await page.goto("/portfolio");
  for (const mode of ["Mockup presentations", "Original artwork"]) {
    await page
      .getByRole("group", { name: "Portfolio display" })
      .getByRole("button", { name: mode, exact: true })
      .click();
    const images = page.locator(".project img");
    await expect(images).toHaveCount(43);
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
  for (const image of await cards.locator("img").all())
    await expect(image).toHaveAttribute("src", /photographic/);
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

test("contact CTAs, Gmail email links and service navigation work", async ({
  page,
}) => {
  await page.goto("/");
  await expect(page.locator(".compact-services .service")).toHaveCount(5);
  await page
    .locator(".hero")
    .getByRole("link", { name: "Let’s work together" })
    .click();
  await expect(page).toHaveURL(/\/contact$/);
  for (const path of ["/", "/about", "/services", "/portfolio", "/contact"]) {
    await page.goto(path);
    for (const link of await page
      .getByRole("link", { name: "Let’s work together", exact: true })
      .all()) {
      await expect(link).toHaveAttribute("href", "/contact");
      await expect(link).not.toHaveAttribute("target", "_blank");
    }
    const email = page.getByRole("link", { name: "Email Jean Monica" });
    const compose = new URL((await email.getAttribute("href"))!);
    expect(compose.origin).toBe("https://mail.google.com");
    expect(compose.searchParams.get("to")).toBe("jeanmonicarche@gmail.com");
    await expect(page.locator(".nav-cta")).toHaveAttribute("href", "/contact");
  }
  await page.goto("/");
  await page
    .getByRole("link", { name: "Explore Graphic Design & Branding" })
    .click();
  await expect(page).toHaveURL(/services#graphic-design$/);
  await expect(page.locator("#graphic-design")).toBeInViewport();
});

test("gold logo loads in header and footer", async ({ page }) => {
  await page.goto("/");
  const logos = page.locator(".brand-symbol img");
  await expect(logos).toHaveCount(2);
  for (const image of await logos.all()) {
    await image.scrollIntoViewIfNeeded();
    await expect
      .poll(() => image.evaluate((e) => (e as HTMLImageElement).naturalWidth))
      .toBeGreaterThan(0);
  }
});
test("lightbox switches between mockup and unchanged artwork", async ({
  page,
}) => {
  await page.goto("/portfolio");
  await page.getByRole("button", { name: "Book Covers", exact: true }).click();
  await page.locator(".project").first().click();
  const dialog = page.getByRole("dialog");
  await expect(dialog.locator("img")).toHaveAttribute("src", /mockups/);
  await dialog
    .getByRole("button", { name: "Show original artwork", exact: true })
    .click();
  await expect(dialog.locator("img")).toHaveAttribute("src", /book-covers/);
  await dialog
    .getByRole("button", { name: "Show mockup presentation", exact: true })
    .click();
  await expect(dialog.locator("img")).toHaveAttribute("src", /mockups/);
  await page.keyboard.press("Escape");
  await expect(dialog).toHaveCount(0);
});

test("featured work uses the requested book cover and Moses design", async ({
  page,
}) => {
  await page.goto("/");
  const showcase = page.locator(".preview-gallery");
  await expect(showcase).toContainText("The Power of Words");
  await expect(showcase).toContainText("Moses — Another Red Sea");
  await expect(showcase).not.toContainText("Ahria’s Adventure");
  await expect(showcase).not.toContainText("Live Not on Bread Alone");
});

test("video section contains seven ready videos with real posters", async ({
  page,
  request,
}) => {
  await page.goto("/portfolio");
  await expect(
    page.getByRole("link", { name: "Explore video editing ↓" }),
  ).toHaveCount(0);
  await page
    .getByRole("button", { name: "Video Editing", exact: true })
    .click();
  await page.locator("#video-heading").scrollIntoViewIfNeeded();
  await expect(page.locator(".project")).toHaveCount(0);
  await expect(page.locator("#video-heading")).toBeInViewport();
  await expect(page.locator(".video-card")).toHaveCount(7);
  await expect(page.locator(".video-pending")).toHaveCount(0);
  const players = page.locator(".video-card video");
  await expect(players).toHaveCount(7);
  for (const player of await players.all()) {
    await expect(player).toHaveAttribute("preload", "none");
    await expect(player).toHaveAttribute("controls", "");
    const poster = (await player.getAttribute("poster"))!;
    expect((await request.get(poster)).status()).toBe(200);
    const src = (await player.getAttribute("src"))!;
    const range = await request.get(src, {
      headers: { Range: "bytes=0-1023" },
    });
    expect(range.status()).toBe(206);
    expect(range.headers()["content-type"]).toContain("video/mp4");
    expect((await range.body()).length).toBe(1024);
  }
});

for (const width of [1440, 375]) {
  test(`real video playback and seeking at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.goto("/portfolio");
    const videos = page.locator(".video-card video");
    for (const player of await videos.all()) {
      await player.scrollIntoViewIfNeeded();
      await player.evaluate(async (node) => {
        const video = node as HTMLVideoElement;
        video.muted = true;
        await video.play();
      });
      await expect
        .poll(() =>
          player.evaluate((node) => (node as HTMLVideoElement).currentTime),
        )
        .toBeGreaterThan(0.1);
      await expect
        .poll(() =>
          player.evaluate((node) => (node as HTMLVideoElement).videoWidth),
        )
        .toBe(720);
      const bounds = await player.boundingBox();
      expect(bounds).not.toBeNull();
      expect(bounds!.width / bounds!.height).toBeCloseTo(9 / 16, 2);
      const duration = await player.evaluate(
        (node) => (node as HTMLVideoElement).duration,
      );
      expect(duration).toBeGreaterThan(35);
      await player.evaluate((node) => {
        const video = node as HTMLVideoElement;
        video.currentTime = video.duration / 2;
      });
      await expect
        .poll(() =>
          player.evaluate((node) => !(node as HTMLVideoElement).seeking),
        )
        .toBe(true);
      await player.evaluate((node) => (node as HTMLVideoElement).pause());
    }
  });
}

test("playing another clip pauses the previous clip", async ({ page }) => {
  await page.goto("/portfolio");
  const players = page.locator(".video-card video");
  for (const i of [0, 1])
    await players.nth(i).evaluate(async (node) => {
      const video = node as HTMLVideoElement;
      video.muted = true;
      await video.play();
    });
  await expect
    .poll(() =>
      players.nth(0).evaluate((node) => (node as HTMLVideoElement).paused),
    )
    .toBe(true);
  await expect
    .poll(() =>
      players.nth(1).evaluate((node) => (node as HTMLVideoElement).paused),
    )
    .toBe(false);
});

test("video load failures offer a direct-open fallback", async ({ page }) => {
  await page.route("**/portfolio/videos/*.mp4", (route) => route.abort());
  await page.goto("/portfolio");
  await page
    .locator(".video-card video")
    .first()
    .evaluate((node) => (node as HTMLVideoElement).load());
  const card = page.locator(".video-card").first();
  await expect(card.getByRole("status")).toContainText("could not load");
  await expect(
    card.getByRole("link", { name: "Open video in a new tab" }),
  ).toHaveAttribute("href", /spinal-candidate\.mp4$/);
});

test("video fullscreen opens and closes", async ({ page }) => {
  await page.goto("/portfolio");
  const player = page.locator(".video-card video").first();
  await player.scrollIntoViewIfNeeded();
  await player.click();
  await player.evaluate((node) =>
    (node as HTMLVideoElement).requestFullscreen(),
  );
  await expect
    .poll(() => page.evaluate(() => document.fullscreenElement?.tagName))
    .toBe("VIDEO");
  await page.evaluate(() => document.exitFullscreen());
  await expect
    .poll(() => page.evaluate(() => document.fullscreenElement === null))
    .toBe(true);
});

test("Social Media Management is removed from services, form and API", async ({
  page,
  request,
}) => {
  await page.goto("/services");
  await expect(page.locator(".service")).toHaveCount(7);
  await expect(
    page.getByRole("heading", { name: "Social Media Management", exact: true }),
  ).toHaveCount(0);
  await page.goto("/contact");
  await expect(
    page
      .getByLabel("Service you’re interested in")
      .locator("option", { hasText: "Social Media Management" }),
  ).toHaveCount(0);
  const response = await request.post("/api/contact", {
    data: {
      name: "Example Visitor",
      email: "visitor@example.com",
      service: "Social Media Management",
      message: "A sample project inquiry with enough detail for validation.",
    },
  });
  expect(response.status()).toBe(400);
});

for (const reduced of [false, true]) {
  test(`featured entrances and page transitions with reduced motion ${reduced}`, async ({
    page,
  }) => {
    await page.emulateMedia({
      reducedMotion: reduced ? "reduce" : "no-preference",
    });
    await page.goto("/");
    const cards = page.locator(".featured-card");
    await expect(cards).toHaveCount(6);
    await cards.first().scrollIntoViewIfNeeded();
    for (const card of await cards.all()) {
      await card.scrollIntoViewIfNeeded();
      await expect
        .poll(() =>
          card.evaluate((node) => Number(getComputedStyle(node).opacity)),
        )
        .toBe(1);
      await expect
        .poll(() => card.evaluate((node) => getComputedStyle(node).transform))
        .toBe("none");
    }
    await page
      .getByRole("navigation", { name: "Main navigation" })
      .getByRole("link", { name: "About", exact: true })
      .click();
    await expect(page).toHaveURL(/\/about$/);
    await expect(page.locator(".page-transition")).toHaveCount(1);
    const animation = await page
      .locator(".page-transition")
      .evaluate((node) => getComputedStyle(node).animationName);
    expect(animation).toBe(reduced ? "none" : "page-enter");
  });
}

test("video editing shares the portfolio filters and All Projects", async ({
  page,
}) => {
  await page.goto("/portfolio");
  const filter = page.getByRole("button", {
    name: "Video Editing",
    exact: true,
  });
  await expect(page.locator(".filters")).toContainText("Video Editing");
  await expect(page.locator(".video-card video")).toHaveCount(7);
  await filter.click();
  await expect(filter).toHaveAttribute("aria-pressed", "true");
  await expect(page.locator(".video-card video")).toHaveCount(7);
  await expect(page.locator(".project")).toHaveCount(0);
  await page.getByRole("button", { name: "Book Covers", exact: true }).click();
  await expect(page.locator(".video-card video")).toHaveCount(0);
  await expect(page.locator(".project")).toHaveCount(6);
  await page.getByRole("button", { name: "All Projects", exact: true }).click();
  await expect(page.locator(".project")).toHaveCount(43);
  await expect(page.locator(".video-card video")).toHaveCount(7);
});

test("every portfolio image reveals on scroll and remains usable after filtering", async ({
  page,
}) => {
  test.setTimeout(90000);
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto("/portfolio");
  const cards = page.locator(".portfolio-sections .portfolio-card");
  await expect(cards).toHaveCount(43);
  for (const card of await cards.all()) {
    await card.scrollIntoViewIfNeeded();
    await expect
      .poll(() =>
        card.evaluate((node) => Number(getComputedStyle(node).opacity)),
      )
      .toBe(1);
    await expect
      .poll(() => card.evaluate((node) => getComputedStyle(node).transform))
      .toBe("none");
  }
  await page
    .getByRole("button", { name: "Original artwork", exact: true })
    .click();
  await page.getByRole("button", { name: "Book Covers", exact: true }).click();
  await expect(cards).toHaveCount(6);
  await cards.first().click();
  const dialog = page.getByRole("dialog");
  const toggle = dialog.getByRole("button", {
    name: "Show mockup presentation",
    exact: true,
  });
  await toggle.click();
  await expect(
    dialog.getByRole("button", { name: "Show original artwork", exact: true }),
  ).toBeFocused();
  await expect
    .poll(() =>
      dialog
        .locator(".lightbox-artwork")
        .evaluate((node) => Number(getComputedStyle(node).opacity)),
    )
    .toBe(1);
  await page.keyboard.press("Escape");
  await expect(dialog).toHaveCount(0);
});

test("all portfolio images stay visible without motion on mobile", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.setViewportSize({ width: 375, height: 900 });
  await page.goto("/portfolio");
  const cards = page.locator(".portfolio-sections .portfolio-card");
  await expect(cards).toHaveCount(43);
  expect(
    await cards.evaluateAll((nodes) =>
      nodes.every(
        (node) =>
          getComputedStyle(node).opacity === "1" &&
          getComputedStyle(node).transform === "none",
      ),
    ),
  ).toBe(true);
});

test("hero video appears after one second, dims the backdrop and can be dismissed", async ({
  page,
}) => {
  await page.clock.install({ time: new Date("2026-10-16T00:00:00Z") });
  await page.clock.pauseAt(new Date("2026-10-16T00:00:01Z"));
  await page.goto("/");
  const video = page.getByLabel("Ark Masterpiece introduction video", {
    exact: true,
  });
  await expect(video).toHaveCount(0);
  await page.clock.runFor(999);
  await expect(video).toHaveCount(0);
  await page.clock.runFor(650);
  await expect(video).toBeVisible();
  await page.clock.resume();
  await expect
    .poll(() =>
      page
        .locator(".hero-image")
        .evaluate((node) => Number(getComputedStyle(node).opacity)),
    )
    .toBeCloseTo(0.4, 1);
  const radius = await page
    .locator(".hero-video-frame")
    .evaluate((node) => parseFloat(getComputedStyle(node).borderRadius));
  expect(radius).toBeGreaterThanOrEqual(18);
  await page.getByRole("button", { name: "Close introduction video" }).click();
  await expect(video).toHaveCount(0);
  await page.clock.runFor(650);
  await expect
    .poll(() =>
      page
        .locator(".hero-image")
        .evaluate((node) => Number(getComputedStyle(node).opacity)),
    )
    .toBe(1);
  await page.getByRole("button", { name: "Watch introduction" }).click();
  await page.clock.runFor(650);
  await expect(video).toBeVisible();
});

for (const width of [1440, 375]) {
  test(`intro video playback and layout at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 1000 });
    await page.goto("/");
    const video = page.getByLabel("Ark Masterpiece introduction video", {
      exact: true,
    });
    await expect(video).toBeVisible({ timeout: 7000 });
    await expect
      .poll(() =>
        video.evaluate((node) => (node as HTMLVideoElement).currentTime),
      )
      .toBeGreaterThan(0.1);
    expect(
      await video.evaluate((node) => (node as HTMLVideoElement).muted),
    ).toBe(true);
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      ),
    ).toBe(true);
    const v = (await video.boundingBox())!;
    const copy = (await page.locator(".hero-content").boundingBox())!;
    if (width === 1440) expect(v.x).toBeGreaterThanOrEqual(copy.x + copy.width);
    else expect(v.y).toBeGreaterThanOrEqual(copy.y + copy.height);
    await page
      .locator(".hero")
      .getByRole("link", { name: "Let’s work together" })
      .click();
    await expect(page).toHaveURL(/\/contact$/);
    await expect(video).toHaveCount(0);
  });
}

test("reduced motion keeps the intro available without autoplay", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  const video = page.getByLabel("Ark Masterpiece introduction video", {
    exact: true,
  });
  await expect(video).toBeVisible({ timeout: 7000 });
  expect(
    await video.evaluate((node) => (node as HTMLVideoElement).paused),
  ).toBe(true);
  await video.evaluate(async (node) => {
    const v = node as HTMLVideoElement;
    v.muted = true;
    await v.play();
  });
  await expect
    .poll(() =>
      video.evaluate((node) => (node as HTMLVideoElement).currentTime),
    )
    .toBeGreaterThan(0.1);
});
