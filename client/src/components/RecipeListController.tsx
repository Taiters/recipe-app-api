/**
 * Handles the app behaviour for retrieving and displaying a list
 * of recipes. The rendering itself is delegated to RecipeList.
 */
import { useRecipes } from "../app/recipes";
import RecipeList from "./RecipeList";

function RecipeListController() {
  const [recipes, isRecipesLoading] = useRecipes();

  return isRecipesLoading ? (
    <p>Loading Recipes...</p>
  ) : (
    <RecipeList recipes={recipes} />
  );
}

export default RecipeListController;
