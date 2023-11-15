import { useRecipes } from "../app/recipes";
import RecipeList from "./RecipeList";

const RecipeListView = () => {
    const [recipes, isRecipesLoading] = useRecipes();

    return isRecipesLoading ? <p>Loading Recipes...</p> : <RecipeList recipes={recipes} />
}

export default RecipeListView;
