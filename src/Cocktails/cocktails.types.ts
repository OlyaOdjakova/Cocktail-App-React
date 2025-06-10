export interface Cocktail {
  idDrink: string;
  strDrink: string;
  strGlass: string;
  strDrinkThumb: string;
  strInstructions: string;
}

export interface CocktailsHeaderProps {
  selectedIngredients: boolean;
  onHandleSearch: (searchValue: string) => void;
  onHandleIngredients: (selectedIngredients: boolean) => void;
}
