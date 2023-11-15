import { useState } from "react";
import styled from "styled-components";
import { RecipeFormData } from "../app/api";
import { Ingredient, RecipeDetail, Tag } from "../app/models";
import RecipeAttributeListForm from "./RecipeAttributeListForm";

const FormField = styled.div``;

type Props = {
    recipe?: RecipeDetail | null
    onSubmit: (data: RecipeFormData) => void,
}

const RecipeForm = ({ recipe, onSubmit }: Props) => {
    const [recipeData, setRecipeData] = useState<RecipeFormData>(recipe ? recipe : {
        title: '',
        description: '',
        time_minutes: 30,
        price: 5,
        ingredients: [],
        tags: [],
    });

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        onSubmit({
            ...recipeData,
            time_minutes: parseInt(recipeData.time_minutes.toString()),
            price: parseFloat(recipeData.price.toString()),
        });
    }

    const setRecipeField = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setRecipeData(data => ({
            ...data,
            [e.target.name]: e.target.value,
        }));
    }

    const setIngredients = (ingredients: Ingredient[]) => setRecipeData(data => ({
        ...data,
        ingredients,
    }));

    const setTags = (tags: Tag[]) => setRecipeData(data => ({
        ...data,
        tags,
    }))

    return (
        <form onSubmit={handleSubmit} data-testid="recipe-form">
            <FormField>
                <label htmlFor="title">Title</label>
                <input id="title" type="text" name="title" value={recipeData.title} onChange={setRecipeField} />
            </FormField>
            <FormField>
                <label htmlFor="description">Description</label>
                <textarea id="description" name="description" value={recipeData.description} onChange={setRecipeField} />
            </FormField>
            <FormField>
                <label htmlFor="time_minutes">Prep Time</label>
                <input id="time_minutes" type="number" name="time_minutes" value={recipeData.time_minutes} onChange={setRecipeField} />
                (minutes)
            </FormField>
            <FormField>
                <label htmlFor="price">Price</label>
                <input id="price" type="number" name="price" value={recipeData.price} onChange={setRecipeField} />
                (minutes)
            </FormField>
            <FormField>
                <fieldset>
                    <legend>Ingredients</legend>
                    <RecipeAttributeListForm attributeType="ingredient" list={recipeData.ingredients} onChange={setIngredients} />
                </fieldset>
            </FormField>
            <FormField>
                <fieldset>
                    <legend>Tags</legend>
                    <RecipeAttributeListForm attributeType="tag" list={recipeData.tags} onChange={setTags} />
                </fieldset>
            </FormField>
            <button type="submit" data-testid="submit">{recipeData.id ? "Update" : "Create"}</button>
        </form>
    )
}

export default RecipeForm;
