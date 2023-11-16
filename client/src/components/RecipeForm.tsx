/**
 * Renders a form for a recipe. This can either be an existing recipe
 * (by passing a recipe property) or a new recipe.
 */
import { useState } from "react";
import { Link } from "react-router-dom";
import { RecipeFormData } from "../app/api";
import { Ingredient, RecipeDetail, Tag } from "../app/models";
import { useRecipeFormDataValidator } from "../app/recipes";
import { Button, ErrorMsg, Fieldset, Input, Label, TextArea } from "./Form";
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

  const [validationErrors, validate] = useRecipeFormDataValidator();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const errors = validate(recipeData);
    if (Object.keys(errors).length === 0) {
      onSubmit({
        ...recipeData,
        time_minutes: parseInt(recipeData.time_minutes.toString()),
        price: parseFloat(recipeData.price.toString()),
      });
    }
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
        data-testid="title"
        id="title"
        type="text"
        name="title"
        value={recipeData.title}
        onChange={setRecipeField}
      />
      {validationErrors.title && <ErrorMsg>{validationErrors.title}</ErrorMsg>}
      <Label htmlFor="description">Description</Label>
      <TextArea
        data-testid="description"
        id="description"
        name="description"
        value={recipeData.description}
        onChange={setRecipeField}
      />
      {validationErrors.description && (
        <ErrorMsg>{validationErrors.description}</ErrorMsg>
      )}
      <Label htmlFor="time_minutes">Prep Time</Label>
      <Input
        data-testid="time_minutes"
        id="time_minutes"
        type="number"
        name="time_minutes"
        value={recipeData.time_minutes}
        onChange={setRecipeField}
      />
      {validationErrors.time_minutes && (
        <ErrorMsg>{validationErrors.time_minutes}</ErrorMsg>
      )}
      <Label htmlFor="price">Price</Label>
      <Input
        data-testid="price"
        id="price"
        type="number"
        name="price"
        value={recipeData.price}
        onChange={setRecipeField}
      />
      {validationErrors.price && <ErrorMsg>{validationErrors.price}</ErrorMsg>}
      <Fieldset>
        <legend>Ingredients</legend>
        <RecipeAttributeListForm
          attributeType="ingredient"
          list={recipeData.ingredients}
          onChange={setIngredients}
        />
        {validationErrors.ingredients && (
          <ErrorMsg>{validationErrors.ingredients}</ErrorMsg>
        )}
      </Fieldset>
      <Fieldset>
        <legend>Tags</legend>
        <RecipeAttributeListForm
          attributeType="tag"
          list={recipeData.tags}
          onChange={setTags}
        />
        {validationErrors.tags && <ErrorMsg>{validationErrors.tags}</ErrorMsg>}
      </Fieldset>
      <Button type="submit" data-testid="submit">
        {recipe ? "Update" : "Create"}
      </Button>
    </form>
  );
}

export default RecipeForm;
