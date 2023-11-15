import { RecipeDetail } from "./app/models";

const createRecipe = (recipe: Partial<RecipeDetail> = {}): RecipeDetail => {
    return {
        id: '12',
        image: null,
        title: 'test recipe',
        description: 'recipe 1234',
        time_minutes: 60,
        price: 5.10,
        tags: [
            { id: '1', name: 'spicy' }
        ],
        ingredients: [
            { id: '1', name: 'chilly' },
            { id: '2', name: 'pepper' },
        ],
        ...recipe,
    };
}

export {
    createRecipe
};
