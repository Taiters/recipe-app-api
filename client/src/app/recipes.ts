import { useCallback, useEffect, useState } from "react";
import { RecipeFormData, useAuthenticatedAPI } from "./api";
import { Recipe, RecipeDetail } from "./models";

const useLoadableState = <T>(initialValue: T, loader: () => Promise<T>): [
    T,
    boolean,
] => {
    const [value, setValue] = useState(initialValue);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setIsLoading(true)
        loader().then(loadedValue => {
            setValue(loadedValue);
            setIsLoading(false);
        });
    }, [loader]);

    return [value, isLoading];
}

const useRecipe = (id: string): [RecipeDetail | null, boolean] => {
    const api = useAuthenticatedAPI();
    const loader = useCallback(() => api.recipe(id), [api, id]);
    return useLoadableState<RecipeDetail | null>(null, loader);
}

const useRecipes = (): [Recipe[], boolean] => {
    const api = useAuthenticatedAPI();
    const loader = useCallback(() => api.recipes(), [api]);
    return useLoadableState([], loader);
}

const useCreateRecipe = (): [(data: RecipeFormData) => Promise<RecipeDetail>, boolean] => {
    const api = useAuthenticatedAPI();
    const [requestInFlight, setRequestInFlight] = useState(false);

    const createRecipe = async (
        recipe: RecipeFormData,
    ) => {
        setRequestInFlight(true);
        const result = await api.createRecipe(recipe);
        setRequestInFlight(false);
        return result;
    }

    return [createRecipe, requestInFlight];
}

const useUpdateRecipe = (): [(id: string, data: RecipeFormData) => Promise<RecipeDetail>, boolean] => {
    const api = useAuthenticatedAPI();
    const [requestInFlight, setRequestInFlight] = useState(false);

    const updateRecipe = async (
        id: string,
        recipe: RecipeFormData,
    ) => {
        setRequestInFlight(true);
        const result = await api.updateRecipe(id, recipe);
        setRequestInFlight(false);
        return result;
    }

    return [updateRecipe, requestInFlight];
}

export { useCreateRecipe, useRecipe, useRecipes, useUpdateRecipe };
