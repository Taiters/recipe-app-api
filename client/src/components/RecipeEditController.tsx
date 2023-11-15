/**
 * Handles the app behaviour for editing a single recipe.
 * The rendering of the form is delegated to the RecipeForm.
 */
import { useState } from "react";
import { Redirect, useParams } from "react-router-dom";
import { RecipeFormData } from "../app/api";
import { RecipeDetail } from "../app/models";
import { useRecipe, useUpdateRecipe } from "../app/recipes";
import RecipeForm from "./RecipeForm";

function RecipeEditController() {
  const { id } = useParams<{ id: string }>();
  const [recipe, isLoading] = useRecipe(id);
  const [updateRecipe, isUpdatingRecipe] = useUpdateRecipe();
  const [updatedRecipe, setUpdatedRecipe] = useState<RecipeDetail | null>(null);

  const handleSubmit = (recipe: RecipeFormData) => {
    updateRecipe(id, recipe).then(setUpdatedRecipe);
  };

  if (isLoading) {
    return <p>Loading recipe...</p>;
  }

  if (updatedRecipe) {
    return <Redirect to={`/recipes/${updatedRecipe.id}`} />;
  }

  return isUpdatingRecipe ? (
    <p>Updating...</p>
  ) : (
    <RecipeForm recipe={recipe} onSubmit={handleSubmit} />
  );
}

export default RecipeEditController;
