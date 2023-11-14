import { useEffect, useMemo, useState } from "react";
import RecipeAPI from "./api";
import { useAuthenticatedUser } from "./auth";
import { RecipeDetail } from "./models";

const useRecipe = (id: string): RecipeDetail | null => {
    const currentUser = useAuthenticatedUser();

    if (currentUser == null) {
        throw new Error("useRecipe requires an authenticated user");
    }

    const [recipe, setRecipe] = useState<RecipeDetail | null>(null);
    const api = useMemo(() => new RecipeAPI(currentUser.token), [currentUser.token]);

    useEffect(() => {
        setRecipe(null);
        api.recipe(id).then(setRecipe);
    }, [api, id]);

    return recipe;
}

export { useRecipe };
