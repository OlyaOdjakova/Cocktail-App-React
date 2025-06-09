import { Cocktail } from "./cocktails.types";

export const getIngredientsWithMeasures = (cocktail: Cocktail): string[] => {
  const result: string[] = [];

  for (let i = 1; i <= 15; i++) {
    const ingredient = cocktail[`strIngredient${i}` as keyof Cocktail];
    const measure = cocktail[`strMeasure${i}` as keyof Cocktail];

    if (ingredient && ingredient.trim()) {
      result.push(`${measure?.trim() || ""} ${ingredient.trim()}`.trim());
    }
  }

  return result;
};
