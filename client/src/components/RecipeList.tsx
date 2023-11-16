/**
 * Displays the app's Recipe list.
 */
import { Link } from "react-router-dom";
import styled from "styled-components";
import { Recipe } from "../app/models";
import RecipeListItem from "./RecipeListItem";

type Props = {
  recipes: Recipe[];
};

const CreateLinkContainer = styled.div`
  text-align: right;
  padding-bottom: 0.5em;
  border-bottom: 1px solid #0004;
`;

const CreateLink = styled(Link)`
  font-weight: bold;
`;

const List = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

function RecipeList({ recipes }: Props) {
  return (
    <div>
      <CreateLinkContainer>
        <CreateLink to="/recipes/create">Add Recipe</CreateLink>
      </CreateLinkContainer>
      {recipes.length > 0 ? (
        <List data-testid="recipe-list">
          {recipes.map((r) => (
            <RecipeListItem key={r.id} recipe={r} />
          ))}
        </List>
      ) : (
        <p>You have no recipes.</p>
      )}
    </div>
  );
}

export default RecipeList;
