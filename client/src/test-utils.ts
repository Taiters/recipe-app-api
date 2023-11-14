import { Recipe as RecipeModel } from './app/models';

const createRecipe = (recipe: Partial<RecipeModel> = {}): RecipeModel => {
    return {
        id: '12',
        image: null,
        name: 'test recipe',
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
