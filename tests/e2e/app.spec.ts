import { expect, test, type Page } from "@playwright/test";

const loader = ".page-loader";
const visibleLoaders = (page: Page) =>
  page.locator(`${loader}[aria-hidden="false"]`);

const waitForHomePage = async (page: Page) => {
  await page.goto("/");
  await expect(
    page.getByRole("heading", {
      name: /I build scalable products and AI systems\./i,
    }),
  ).toBeVisible();
};

test.describe("portfolio e2e flows", () => {
  test("loads the basic page", async ({ page }) => {
    await waitForHomePage(page);

    await expect(
      page.getByText("Software Engineer / Premium Digital Products"),
    ).toBeVisible();
    await expect(
      page.getByRole("button", { name: "Get in touch" }),
    ).toBeVisible();
    await expect(
      page.getByRole("link", { name: /Arseniy Pilipenko homepage/i }),
    ).toBeVisible();
  });

  test("scrolls through the full basic page information", async ({ page }) => {
    await waitForHomePage(page);

    const sectionChecks = [
      {
        section: page.locator("#expertise"),
        heading: page.getByRole("heading", {
          name: "What I build and optimize",
        }),
        text: "Frontend Engineering",
      },
      {
        section: page.locator("#work"),
        heading: page.getByRole("heading", {
          name: /Products built for speed, clarity, and business impact\./i,
        }),
        text: "AI PR Review Assistant",
      },
      {
        section: page.locator("#clients"),
        heading: page.getByRole("heading", {
          name: /Trusted experience across complex digital products\./i,
        }),
        text: "Enterprise Security",
      },
      {
        section: page.locator("section").filter({ hasText: "Process" }),
        heading: page.getByRole("heading", {
          name: /A clear path from idea to launch\./i,
        }),
        text: "Discovery",
      },
      {
        section: page.locator("#blog"),
        heading: page.getByRole("heading", {
          name: /Ideas on AI, frontend, and product engineering\./i,
        }),
        text: "How AI is changing frontend engineering",
      },
    ];

    for (const { section, heading, text } of sectionChecks) {
      await section.scrollIntoViewIfNeeded();
      await expect(heading).toBeVisible();
      await expect(section).toContainText(text);
    }
  });

  test("navigates from selected work to a full project page with preload", async ({
    page,
  }) => {
    await waitForHomePage(page);

    const projectLink = page
      .getByRole("link", { name: /AI PR Review Assistant/i })
      .first();

    await projectLink.scrollIntoViewIfNeeded();
    await projectLink.click();
    await expect(visibleLoaders(page).first()).toBeVisible();
    await page.waitForURL("**/project/ai-pr-review-assistant");
    await expect(visibleLoaders(page)).toHaveCount(0);

    await expect(
      page.getByRole("heading", { name: "AI PR Review Assistant" }),
    ).toBeVisible();
    await expect(page.getByText("Pull Request #142")).toBeVisible();
    await expect(
      page.getByText("GitHub webhook receives pull request event"),
    ).toBeVisible();

    const overviewSection = page.locator(".project-section").first();
    await overviewSection.scrollIntoViewIfNeeded();
    await expect(overviewSection).toContainText("Overview");
    await expect(overviewSection).toContainText("Key Results");
    await expect(overviewSection).toContainText("Reduction in review time");

    const detailsSection = page.locator(".project-section").nth(1);
    await detailsSection.scrollIntoViewIfNeeded();
    await expect(detailsSection).toContainText("Key Features");
    await expect(detailsSection).toContainText("Tech Stack");
  });

  test("navigates from insights to a full article page with preload", async ({
    page,
  }) => {
    await waitForHomePage(page);

    const articleLink = page.locator(
      '#blog a[href="/articles/ai-changing-frontend-engineering"]',
    );

    await articleLink.scrollIntoViewIfNeeded();
    await articleLink.click();
    await expect(visibleLoaders(page).first()).toBeVisible();
    await page.waitForURL("**/articles/ai-changing-frontend-engineering");
    await expect(visibleLoaders(page)).toHaveCount(0);

    await expect(
      page.getByRole("heading", {
        name: "How AI is changing frontend engineering.",
      }),
    ).toBeVisible();
    await expect(
      page.getByText("AI is a tool, not engineering judgment."),
    ).toBeVisible();
    await expect(
      page.getByText("AI changes the workflow, not the responsibility."),
    ).toBeVisible();
    await expect(page.getByText("Key Areas")).toBeVisible();
  });

  test("opens the contact modal and sends the email form", async ({ page }) => {
    await page.route("https://api.web3forms.com/submit", async (route) => {
      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify({ success: true, message: "Message sent" }),
      });
    });

    await waitForHomePage(page);

    await page.getByRole("button", { name: "Get in touch" }).click();
    await expect(page.getByText("Project inquiry")).toBeVisible();
    await expect(page.getByRole("button", { name: "Email me" })).toBeVisible();
    await expect(
      page.getByRole("link", { name: "Connect on LinkedIn" }),
    ).toBeVisible();

    await page.getByRole("button", { name: "Email me" }).click();
    await expect(page.getByText("Email inquiry")).toBeVisible();

    await page.getByPlaceholder("Your name").fill("Playwright Tester");
    await page.getByPlaceholder("Email address").fill("tester@example.com");
    await page.getByPlaceholder("Company / product name").fill("E2E Project");
    await page
      .getByPlaceholder("What do you want to build?")
      .fill("A reliable Playwright test suite for portfolio flows.");

    const submitRequest = page.waitForRequest(
      "https://api.web3forms.com/submit",
    );
    await page.getByRole("button", { name: "Send email" }).click();

    const request = await submitRequest;
    const body = request.postData() ?? "";

    expect(body).toContain("Playwright Tester");
    expect(body).toContain("tester@example.com");
    expect(body).toContain("E2E Project");
    await expect(page.getByText("Message sent")).toBeVisible();
    await expect(page.getByText("Thanks.")).toBeVisible();
  });
});
