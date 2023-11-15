import { Recipe } from "../app/models"
import RecipeListItem from "./RecipeListItem"

type Props = {
    recipes: Recipe[],
}

const RecipeList = ({ recipes }: Props) => {
    return (
        <ul data-testid="recipe-list">
            {recipes.map(r => <RecipeListItem key={r.id} recipe={r} />)}
        </ul>
    )
}

export default RecipeList;
