import { Cocktail } from "./cocktails.types";
import { COCKTAILS_LIST } from "./cocktails.constants";

export const fetchCocktails = async () => {
  try {
    const fetchPromises = Array.from({ length: 9 }, () =>
      fetch(COCKTAILS_LIST).then(async (res) => {
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        const data = await res.json();
        return data.drinks?.[0] as Cocktail;
      }),
    );
    return await Promise.all(fetchPromises);
  } catch (error: any) {
    console.error("Fetch failed:", error.message);
    return [];
  }
};
