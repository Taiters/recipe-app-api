/**
 * Hooks which manage recipe interactions. These encapsulate the logic which
 * interacts with the API itself and also manage state tracking
 * in flight requests etc so components can act accordingly
 * (e.g. Show a loading state)
 */

import { useCallback, useEffect, useState } from "react";
import { RecipeFormData, useAuthenticatedAPI } from "./api";
import { Recipe, RecipeDetail } from "./models";

/**
 * Allows loading of state (e.g. from API) asynchronously
 * via the provided loader, and returns a boolean which
 * monitors the loading state.
 *
 * @param initialValue - Initial state value
 * @param loader - Async function which loads the state
 */
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

/**
 * Returns a callback and a boolean which is used to monitor
 * when the callback is "in flight". For example, a call to an API
 * would be "in flight" between the call to makeRequest and the API
 * returning.
 */
function useInFlightCallback(): [
  <T>(callback: () => Promise<T>) => Promise<T>,
  boolean,
] {
  const [inFlight, setInFlight] = useState(false);

  const recordCallback = async <T>(callback: () => Promise<T>): Promise<T> => {
    setInFlight(true);
    const result = await callback();
    setInFlight(false);
    return result;
  };

  return [recordCallback, inFlight];
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
  const [recordCreate, creationInFlight] = useInFlightCallback();
  const createRecipe = async (recipe: RecipeFormData) =>
    await recordCreate(async () => await api.createRecipe(recipe));

  return [createRecipe, creationInFlight];
}

function useUpdateRecipe(): [
  (id: string, data: RecipeFormData) => Promise<RecipeDetail>,
  boolean,
] {
  const api = useAuthenticatedAPI();
  const [recordUpdate, updateInFlight] = useInFlightCallback();
  const updateRecipe = async (id: string, recipe: RecipeFormData) =>
    await recordUpdate(async () => await api.updateRecipe(id, recipe));

  return [updateRecipe, updateInFlight];
}

function useDeleteRecipe(): [(id: string) => Promise<void>, boolean] {
  const api = useAuthenticatedAPI();
  const [recordDelete, deletionInFlight] = useInFlightCallback();
  const deleteRecipe = async (id: string) =>
    await recordDelete(async () => await api.deleteRecipe(id));

  return [deleteRecipe, deletionInFlight];
}

export {
  useCreateRecipe,
  useDeleteRecipe,
  useRecipe,
  useRecipes,
  useUpdateRecipe,
};
