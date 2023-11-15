import styled from "styled-components";
import { RecipeDetail as RecipeDetailModel } from "../app/models";

const Container = styled.div``
const Name = styled.h2``
const Image = styled.img``
const Description = styled.p``
const Info = styled.p``

type Props = {
    recipe: RecipeDetailModel,
}
const RecipeDetail = ({ recipe }: Props) => (
    <Container data-testid={`recipe-detail-${recipe.id}`}>
        <Name data-testid="title">{recipe.title}</Name>
        {recipe.image && <Image data-testid="image" src={recipe.image} alt={recipe.title} />}
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

export default RecipeDetail;
