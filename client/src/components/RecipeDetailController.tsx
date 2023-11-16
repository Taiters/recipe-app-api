/**
 * Handles the app behaviour for retrieving and displaying a single recipe.
 * The rendering itself is delegated to RecipeDetail.
 */
import { useState } from "react";
import { Redirect, useParams } from "react-router-dom";
import { useDeleteRecipe, useRecipe } from "../app/recipes";
import RecipeDetail from "./RecipeDetail";

function RecipeDetailController() {
  const { id } = useParams<{ id: string }>();
  const [recipe, isRecipeLoading] = useRecipe(id);
  const [deleteRecipe, isRecipeDeleting] = useDeleteRecipe();
  const [hasDeletedRecipe, setHasDeletedRecipe] = useState(false);

  const onDelete = () => deleteRecipe(id).then(() => setHasDeletedRecipe(true));

  if (isRecipeLoading) {
    return <p>Loading Recipe...</p>;
  }

  if (isRecipeDeleting) {
    return <p>Deleting Recipe...</p>;
  }

  return recipe == null || hasDeletedRecipe ? (
    <Redirect to="/" />
  ) : (
    <RecipeDetail recipe={recipe} onDelete={onDelete} />
  );
}

export default RecipeDetailController;
