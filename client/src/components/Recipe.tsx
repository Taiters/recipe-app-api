import styled from "styled-components";
import { Recipe as RecipeModel } from "../app/models";

const Container = styled.div``
const Name = styled.h2``
const Image = styled.img``
const Description = styled.p``
const Info = styled.p``

type Props = {
    recipe: RecipeModel,
}
const Recipe = ({ recipe }: Props) => (
    <Container data-testid={`recipe-${recipe.id}`}>
        <Name data-testid="name">{recipe.name}</Name>
        {recipe.image && <Image data-testid="image" src={recipe.image} alt={recipe.name} />}
        ge
        <Description data-testid="description">{recipe.description}</Description>
        <Info data-testid="time">Prep time: {recipe.time_minutes} minutes</Info>
        <Info data-testid="price">£{recipe.price}</Info>
        {recipe.ingredients.length > 0 && (
            <>
                <p>Ingredients</p>
                <ol data-testid="ingredients">
                    {recipe.ingredients.map(i => <li key={i.id}>{i.name}</li>)}
                </ol>
            </>
        )}
        {recipe.tags.length > 0 && (
            <>
                <p>Tags</p>
                <ol data-testid="tags">
                    {recipe.tags.map(t => <li key={t.id}>{t.name}</li>)}
                </ol>
            </>
        )}
    </Container>
)

export default Recipe;
