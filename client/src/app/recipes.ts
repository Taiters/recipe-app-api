/**
 * Hooks which manage recipe interactions. These encapsulate the logic which
 * interacts with the API itself and also manage state tracking
 * in flight requests etc so components can act accordingly
 * (e.g. Show a loading state)
 */

import { useCallback, useEffect, useState } from "react";
import { RecipeFormData, useAuthenticatedAPI } from "./api";
import { Recipe, RecipeDetail } from "./models";

function useLoadableState<T>(
  initialValue: T,
  loader: () => Promise<T>,
): [T, boolean] {
  const [value, setValue] = useState(initialValue);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    loader().then((loadedValue) => {
      setValue(loadedValue);
      setIsLoading(false);
    });
  }, [loader]);

  return [value, isLoading];
}

function useRecipe(id: string): [RecipeDetail | null, boolean] {
  const api = useAuthenticatedAPI();
  const loader = useCallback(() => api.recipe(id), [api, id]);
  return useLoadableState<RecipeDetail | null>(null, loader);
}

function useRecipes(): [Recipe[], boolean] {
  const api = useAuthenticatedAPI();
  const loader = useCallback(() => api.recipes(), [api]);
  return useLoadableState([], loader);
}

function useCreateRecipe(): [
  (data: RecipeFormData) => Promise<RecipeDetail>,
  boolean,
] {
  const api = useAuthenticatedAPI();
  const [requestInFlight, setRequestInFlight] = useState(false);

  const createRecipe = async (recipe: RecipeFormData) => {
    setRequestInFlight(true);
    const result = await api.createRecipe(recipe);
    setRequestInFlight(false);
    return result;
  };

  return [createRecipe, requestInFlight];
}

function useUpdateRecipe(): [
  (id: string, data: RecipeFormData) => Promise<RecipeDetail>,
  boolean,
] {
  const api = useAuthenticatedAPI();
  const [requestInFlight, setRequestInFlight] = useState(false);

  const updateRecipe = async (id: string, recipe: RecipeFormData) => {
    setRequestInFlight(true);
    const result = await api.updateRecipe(id, recipe);
    setRequestInFlight(false);
    return result;
  };

  return [updateRecipe, requestInFlight];
}

function useDeleteRecipe(): [(id: string) => Promise<void>, boolean] {
  const api = useAuthenticatedAPI();
  const [requestInFlight, setRequestInFlight] = useState(false);

  const deleteRecipe = async (id: string) => {
    setRequestInFlight(true);
    await api.deleteRecipe(id);
    setRequestInFlight(false);
  };

  return [deleteRecipe, requestInFlight];
}

export {
  useCreateRecipe,
  useDeleteRecipe,
  useRecipe,
  useRecipes,
  useUpdateRecipe,
};
