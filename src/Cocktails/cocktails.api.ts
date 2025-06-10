import { Cocktail } from "./cocktails.types";

export const fetchCocktails = async (): Promise<Cocktail[]> => {
  try {
    const fetchPromises = Array.from({ length: 3 }, () =>
      fetch("https://www.thecocktaildb.com/api/json/v1/1/random.php").then(
        async (res) => {
          if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
          const data = await res.json();
          return data.drinks?.[0] as Cocktail;
        },
      ),
    );
    return await Promise.all(fetchPromises);
  } catch (error: any) {
    console.error("Fetch failed:", error.message);
    return [];
  }
};
