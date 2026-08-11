import { expect, test } from "@playwright/test";

test("showcase público está acessível", async ({ page }) => {
  await page.goto("/showcase");

  await expect(
    page.getByRole("heading", { name: "SoeiroTech Engineering Atlas" }),
  ).toBeVisible();
});
