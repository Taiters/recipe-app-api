/**
 * Displays information about a single Recipe.
 */
import { Link } from "react-router-dom";
import styled from "styled-components";
import { RecipeDetail as RecipeDetailModel } from "../app/models";

const Delete = styled.button`
  background-color: #ea4a4a;
  color: #fff;
  font-weight: bold;
  padding: 0.25em 1em;
  border: none;
  cursor: pointer;
`;

type Props = {
  recipe: RecipeDetailModel;
  onDelete: () => void;
};

function RecipeDetail({ recipe, onDelete }: Props) {
  return (
    <div data-testid={`recipe-detail-${recipe.id}`}>
      <Link to={`/recipes/${recipe.id}/edit`}>Edit</Link>
      <h2 data-testid="title">{recipe.title}</h2>
      {recipe.image && (
        <img data-testid="image" src={recipe.image} alt={recipe.title} />
      )}
      <p data-testid="description">{recipe.description}</p>
      <p data-testid="time">Prep time: {recipe.time_minutes} minutes</p>
      <p data-testid="price">£{recipe.price}</p>
      {recipe.ingredients.length > 0 && (
        <>
          <p>Ingredients</p>
          <ol data-testid="ingredients">
            {recipe.ingredients.map((ingredient, i) => (
              <li key={i}>{ingredient.name}</li>
            ))}
          </ol>
        </>
      )}
      {recipe.tags.length > 0 && (
        <>
          <p>Tags</p>
          <ol data-testid="tags">
            {recipe.tags.map((tag, i) => (
              <li key={i}>{tag.name}</li>
            ))}
          </ol>
        </>
      )}
      <Delete data-testid="delete" onClick={onDelete}>
        Delete
      </Delete>
    </div>
  );
}

export default RecipeDetail;
