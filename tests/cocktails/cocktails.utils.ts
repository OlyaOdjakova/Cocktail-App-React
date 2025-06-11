import { expect, Page } from "@playwright/test";
import { cocktailsLocators } from "./cocktails.locators";

export const testCocktailsTitle = async (page: Page) => {
  await expect(page.locator("text=COCKTAIL RECIPES")).toBeVisible();
};

export const testIngredientsTitle = async (page: Page) => {
  await page.locator(cocktailsLocators.ingredientsButton).click();
  await expect(page.locator("text=COCKTAIL INGREDIENTS")).toBeVisible();
};
