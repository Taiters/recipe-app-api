import { useEffect, useMemo, useState } from "react";
import RecipeAPI from "./api";
import { useAuthenticatedUser } from "./auth";
import { Recipe as RecipeModel } from "./models";

const useRecipe = (id: string): RecipeModel | null => {
    const currentUser = useAuthenticatedUser();

    if (currentUser == null) {
        throw new Error("useRecipe requires an authenticated user");
    }

    const [recipe, setRecipe] = useState<RecipeModel | null>(null);
    const api = useMemo(() => new RecipeAPI(currentUser.token), [currentUser.token]);

    useEffect(() => {
        setRecipe(null);
        api.recipe(id).then(setRecipe);
    }, [api, id]);

    return recipe;
}

export { useRecipe };
