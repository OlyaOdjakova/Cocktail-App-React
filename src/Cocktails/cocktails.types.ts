export interface Cocktail {
  idDrink: string;
  strDrink: string;
  strGlass: string;
  strDrinkThumb: string;
  strInstructions: string;
}

export interface Ingredient {
  idDrink: string;
  strDrink: string;
  strDrinkThumb: string;
}

export interface CocktailsHeaderProps {
  isSelectedIngredients: boolean;
  onHandleSearch: (searchValue: string) => void;
  onHandleIngredients: (selectedIngredients: boolean) => void;
}

export interface IngredientProps {
  isSelectedIngredients: boolean;
}
