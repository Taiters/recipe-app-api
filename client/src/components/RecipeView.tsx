import { useParams } from "react-router-dom";
import { useRecipe } from "../app/recipes";
import Recipe from "./Recipe";

const RecipeView = () => {
    const { id } = useParams<{ id: string }>();
    const recipe = useRecipe(id);

    return recipe == null ? <p>Loading Recipe...</p> : <Recipe recipe={recipe} />
}

export default RecipeView;
