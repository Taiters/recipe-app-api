/**
 * Renders a form for a recipe. This can either be an existing recipe
 * (by passing a recipe property) or a new recipe.
 */
import { useState } from "react";
import { Link } from "react-router-dom";
import { RecipeFormData } from "../app/api";
import { Ingredient, RecipeDetail, Tag } from "../app/models";
import { Button, Fieldset, Input, Label, TextArea } from "./Form";
import RecipeAttributeListForm from "./RecipeAttributeListForm";

type Props = {
  recipe?: RecipeDetail | null;
  onSubmit: (data: RecipeFormData) => void;
};

function RecipeForm({ recipe, onSubmit }: Props) {
  const [recipeData, setRecipeData] = useState<RecipeFormData>(
    recipe
      ? recipe
      : {
          title: "",
          description: "",
          time_minutes: 30,
          price: 5,
          ingredients: [],
          tags: [],
        },
  );

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit({
      ...recipeData,
      time_minutes: parseInt(recipeData.time_minutes.toString()),
      price: parseFloat(recipeData.price.toString()),
    });
  };

  const setRecipeField = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setRecipeData((data) => ({
      ...data,
      [e.target.name]: e.target.value,
    }));
  };

  const setIngredients = (ingredients: Ingredient[]) =>
    setRecipeData((data) => ({
      ...data,
      ingredients,
    }));

  const setTags = (tags: Tag[]) =>
    setRecipeData((data) => ({
      ...data,
      tags,
    }));

  return (
    <form
      onSubmit={handleSubmit}
      data-testid={recipe ? `recipe-form-${recipe.id}` : "recipe-form"}
    >
      {recipe && <Link to={`/recipes/${recipe.id}`}>&lt; Back</Link>}
      <Label htmlFor="title">Title</Label>
      <Input
        id="title"
        type="text"
        name="title"
        value={recipeData.title}
        onChange={setRecipeField}
      />
      <Label htmlFor="description">Description</Label>
      <TextArea
        id="description"
        name="description"
        value={recipeData.description}
        onChange={setRecipeField}
      />
      <Label htmlFor="time_minutes">Prep Time</Label>
      <Input
        id="time_minutes"
        type="number"
        name="time_minutes"
        value={recipeData.time_minutes}
        onChange={setRecipeField}
      />
      <Label htmlFor="price">Price</Label>
      <Input
        id="price"
        type="number"
        name="price"
        value={recipeData.price}
        onChange={setRecipeField}
      />
      <Fieldset>
        <legend>Ingredients</legend>
        <RecipeAttributeListForm
          attributeType="ingredient"
          list={recipeData.ingredients}
          onChange={setIngredients}
        />
      </Fieldset>
      <Fieldset>
        <legend>Tags</legend>
        <RecipeAttributeListForm
          attributeType="tag"
          list={recipeData.tags}
          onChange={setTags}
        />
      </Fieldset>
      <Button type="submit" data-testid="submit">
        {recipe ? "Update" : "Create"}
      </Button>
    </form>
  );
}

export default RecipeForm;
