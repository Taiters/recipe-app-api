import { useMemo } from "react";
import { useAuthenticatedUser } from "./auth";
import { Recipe, RecipeDetail, User } from "./models";

export type RecipeFormData =
    Pick<RecipeDetail, 'title' | 'description' | 'time_minutes' | 'price' | 'ingredients' | 'tags'>
    & { id?: string }

class RecipeAPI {
    token: string;

    constructor(token: string) {
        this.token = token;
    }

    private async request(
        path: string,
        method: "GET" | "POST" | "PUT" | "DELETE" = "GET",
        body: BodyInit | null = null
    ): Promise<Response> {
        return await fetch(
            path,
            {
                method,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Token ${this.token}`,
                },
                body,
            },
        )
    }

    async me(): Promise<User> {
        const response = await this.request("/api/user/me/");
        return await response.json() as User;
    }

    async recipes(): Promise<Recipe[]> {
        const response = await this.request("/api/recipe/recipes/");
        return await response.json() as Recipe[];
    }

    async recipe(id: string): Promise<RecipeDetail> {
        const response = await this.request(`/api/recipe/recipes/${id}/`)
        return await response.json() as RecipeDetail;
    }

    async createRecipe(recipe: RecipeFormData): Promise<RecipeDetail> {
        const response = await this.request(
            `/api/recipe/recipes/`,
            'POST',
            JSON.stringify(recipe)
        );
        return await response.json() as RecipeDetail;
    }

    static async token(email: string, password: string): Promise<string> {
        const response = await fetch(
            "/api/user/tokens/",
            {
                method: 'POST',
                body: JSON.stringify({ email, password }),
                headers: {
                    'Content-Type': 'application/json',
                },
            }
        );
        const tokenData = await response.json();
        return tokenData['token'];
    }
}

const useAuthenticatedAPI = () => {
    const currentUser = useAuthenticatedUser();
    if (currentUser == null) {
        throw new Error("useAuthenticatedAPI requires an authenticated user");
    }

    return useMemo(() => new RecipeAPI(currentUser.token), [currentUser.token]);
}

export { RecipeAPI, useAuthenticatedAPI };
