import { RecipeDetail } from "./app/models";

function createRecipe(recipe: Partial<RecipeDetail> = {}): RecipeDetail {
  return {
    id: "12",
    image: null,
    title: "test recipe",
    description: "recipe 1234",
    time_minutes: 60,
    price: 5.12,

    tags: [{ name: "spicy" }],
    ingredients: [{ name: "chilly" }, { name: "pepper" }],
    ...recipe,
  };
}

export { createRecipe };
