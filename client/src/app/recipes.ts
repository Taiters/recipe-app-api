import { useEffect, useMemo, useState } from "react";
import RecipeAPI from "./api";
import { useAuthenticatedUser } from "./auth";
import { Recipe, RecipeDetail } from "./models";

const useRecipe = (id: string): [RecipeDetail | null, boolean] => {
    const currentUser = useAuthenticatedUser();
    const [isLoading, setIsLoading] = useState(true);

    if (currentUser == null) {
        throw new Error("useRecipe requires an authenticated user");
    }

    const [recipe, setRecipe] = useState<RecipeDetail | null>(null);
    const api = useMemo(() => new RecipeAPI(currentUser.token), [currentUser.token]);

    useEffect(() => {
        setRecipe(null);
        setIsLoading(true);
        api.recipe(id).then(r => {
            setRecipe(r);
            setIsLoading(false);
        });
    }, [api, id]);

    return [recipe, isLoading];
}

const useRecipes = (): [Recipe[], boolean] => {
    const currentUser = useAuthenticatedUser();
    const [isLoading, setIsLoading] = useState(true);

    if (currentUser == null) {
        throw new Error("useRecipes requires an authenticated user");
    }

    const [recipes, setRecipes] = useState<Recipe[]>([]);
    const api = useMemo(() => new RecipeAPI(currentUser.token), [currentUser.token]);

    useEffect(() => {
        setRecipes([]);
        setIsLoading(true);
        api.recipes().then(r => {
            setRecipes(r);
            setIsLoading(false);
        });
    }, [api]);

    return [recipes, isLoading];
}

export { useRecipe, useRecipes };
