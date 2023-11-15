import { useEffect, useState } from "react";
import { useAuthenticatedAPI } from "./api";
import { Recipe, RecipeDetail } from "./models";

const useRecipe = (id: string): [RecipeDetail | null, boolean] => {
    const api = useAuthenticatedAPI();
    const [isLoading, setIsLoading] = useState(true);
    const [recipe, setRecipe] = useState<RecipeDetail | null>(null);

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
    const api = useAuthenticatedAPI();
    const [isLoading, setIsLoading] = useState(true);
    const [recipes, setRecipes] = useState<Recipe[]>([]);

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
