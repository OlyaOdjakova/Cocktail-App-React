import { test } from "@playwright/test";
import { testCocktailsTitle, testIngredientsTitle } from "./cocktails.utils";

test.beforeEach(async ({ page }): Promise<void> => {
  await page.goto("/");
});

test("cocktails page has cocktail recipes title", async ({ page }) => {
  await testCocktailsTitle(page);
});

test("ingredients page has cocktail ingredients title", async ({ page }) => {
  await testIngredientsTitle(page);
});
