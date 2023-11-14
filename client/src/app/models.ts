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
    name: string,
    description: string,
    image: string | null,
    time_minutes: number
    price: number,
    ingredients: Ingredient[],
    tags: Tag[],
}
