/**
 * Renders a single recipe item as part of a RecipeList.
 */
import { Link } from "react-router-dom";
import { Recipe } from "../app/models";

type Props = {
  recipe: Recipe;
};

function RecipeListItem({ recipe }: Props) {
  return (
    <li data-testid={`recipe-${recipe.id}`}>
      <h3>
        <Link to={`/recipes/${recipe.id}`}>{recipe.title}</Link>
      </h3>
      <p>
        Prep time: {recipe.time_minutes} | £{recipe.price}
      </p>
    </li>
  );
}

export default RecipeListItem;
