import { useParams } from "react-router-dom";
import { useRecipe } from "../app/recipes";
import RecipeDetail from "./RecipeDetail";

const RecipeDetailView = () => {
    const { id } = useParams<{ id: string }>();
    const [recipe, isRecipeLoading] = useRecipe(id);

    return isRecipeLoading || recipe == null ? <p>Loading Recipe...</p> : <RecipeDetail recipe={recipe} />
}

export default RecipeDetailView;
