/**
 * Renders a single recipe item as part of a RecipeList.
 */
import { Link } from "react-router-dom";
import styled from "styled-components";
import { Recipe } from "../app/models";

const Item = styled.li`
  padding: 0.1em 1em;
  &:nth-child(even) {
    background-color: #0001;
  }
`;

type Props = {
  recipe: Recipe;
};

function RecipeListItem({ recipe }: Props) {
  return (
    <Item data-testid={`recipe-${recipe.id}`}>
      <h3>
        <Link to={`/recipes/${recipe.id}`}>{recipe.title}</Link>
      </h3>
      <p>
        Prep time: {recipe.time_minutes} | £{recipe.price}
      </p>
    </Item>
  );
}

export default RecipeListItem;
