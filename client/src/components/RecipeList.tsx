import { Link } from "react-router-dom"
import { Recipe } from "../app/models"
import RecipeListItem from "./RecipeListItem"

type Props = {
    recipes: Recipe[],
}

const RecipeList = ({ recipes }: Props) => {
    return (
        <div>
            <Link to="/recipes/create">Add Recipe</Link>
            <ul data-testid="recipe-list">
                {recipes.map(r => <RecipeListItem key={r.id} recipe={r} />)}
            </ul>
        </div>
    )
}

export default RecipeList;
