import { useCallback, useEffect, useState } from "react";
import { useAuthenticatedAPI } from "./api";
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
    const [recipe, isLoading] = useLoadableState<RecipeDetail | null>(null, loader);

    return [recipe, isLoading];
}

const useRecipes = (): [Recipe[], boolean] => {
    const api = useAuthenticatedAPI();
    const loader = useCallback(() => api.recipes(), [api]);
    const [recipes, isLoading] = useLoadableState([], loader);

    return [recipes, isLoading];
}

export { useRecipe, useRecipes };
