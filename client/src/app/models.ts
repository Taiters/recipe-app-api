export type User = {
    email: string,
}

export type RecipeAttribute = {
    id: string,
    name: string,
}
export type Ingredient = RecipeAttribute;
export type Tag = RecipeAttribute;

export type Recipe = {
    id: string,
    title: string,
    time_minutes: number
    price: number,
    ingredients: Ingredient[],
    tags: Tag[],
}

export type RecipeDetail = {
    image: string | null,
    description: string,
} & Recipe;
