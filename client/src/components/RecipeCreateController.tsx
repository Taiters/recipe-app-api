import { useState } from "react";
import { Redirect } from "react-router-dom";
import { RecipeFormData } from "../app/api";
import { RecipeDetail } from "../app/models";
import { useCreateRecipe } from "../app/recipes";
import RecipeForm from "./RecipeForm";

const RecipeCreateController = () => {
    const [createdRecipe, setCreatedRecipe] = useState<RecipeDetail | null>(null);
    const [createRecipe, isCreatingRecipe] = useCreateRecipe();

    const handleSubmit = (recipe: RecipeFormData) => {
        createRecipe(recipe).then(setCreatedRecipe);
    }

    if (createdRecipe) {
        return <Redirect to={`/recipes/${createdRecipe.id}`} />
    }

    return isCreatingRecipe
        ? <p>Creating...</p>
        : <RecipeForm onSubmit={handleSubmit} />
}

export default RecipeCreateController;
