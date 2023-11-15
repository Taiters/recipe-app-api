import { render, screen } from "@testing-library/react";
import userEvent, { UserEvent } from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import RecipeForm from "./RecipeForm";

const INITIAL_RECIPE_DATA = {
  id: "12345",
  title: "Original title",
  description: "A description",
  price: 43.32,
  time_minutes: 75,
  ingredients: [{ name: "pepper" }],
  tags: [{ name: "peppery" }],
  image: null,
};

async function populateField(
  user: UserEvent,
  fieldLabel: string,
  value: string,
) {
  const inputField = screen.getByLabelText(fieldLabel);
  await user.clear(inputField);
  await user.click(inputField);
  await user.keyboard(value);
}

test("Submitting form for a new recipe", async () => {
  const user = userEvent.setup();
  const recipeData = {
    title: "Spicy something",
    description: "A description",
    price: 43.32,
    time_minutes: 75,
    ingredients: [],
    tags: [],
  };
  const onSubmit = jest.fn();

  render(
    <MemoryRouter>
      <RecipeForm onSubmit={onSubmit} />
    </MemoryRouter>,
  );

  await populateField(user, "Title", recipeData.title);
  await populateField(user, "Description", recipeData.description);
  await populateField(user, "Price", recipeData.price.toString());
  await populateField(user, "Prep Time", recipeData.time_minutes.toString());

  await userEvent.click(screen.getByTestId("submit"));

  expect(onSubmit).toHaveBeenCalledWith(recipeData);
});

test("Submitting form for an existing recipe", async () => {
  const user = userEvent.setup();
  const newTitle = "New title";
  const onSubmit = jest.fn();

  render(
    <MemoryRouter>
      <RecipeForm onSubmit={onSubmit} recipe={INITIAL_RECIPE_DATA} />
    </MemoryRouter>,
  );

  await populateField(user, "Title", newTitle);

  await userEvent.click(screen.getByTestId("submit"));

  expect(onSubmit).toHaveBeenCalledWith({
    ...INITIAL_RECIPE_DATA,
    title: newTitle,
  });
});

test("Can edit ingredients in form", async () => {
  const user = userEvent.setup();
  const recipeData = {
    ...INITIAL_RECIPE_DATA,
    ingredients: [{ name: "pepper" }, { name: "sauce" }],
  };
  const onSubmit = jest.fn();

  render(
    <MemoryRouter>
      <RecipeForm onSubmit={onSubmit} recipe={recipeData} />
    </MemoryRouter>,
  );

  await user.click(screen.getByTestId("add-ingredient"));
  await user.click(screen.getByTestId("ingredient-2"));
  await user.keyboard("new ingredient");

  const middleIngredient = screen.getByTestId("ingredient-1");
  await user.click(middleIngredient);
  await user.clear(middleIngredient);
  await user.keyboard("brown sauce");

  await user.click(screen.getByTestId("remove-ingredient-0"));
  await user.click(screen.getByTestId("submit"));

  expect(onSubmit).toHaveBeenCalledWith({
    ...recipeData,
    ingredients: [{ name: "brown sauce" }, { name: "new ingredient" }],
  });
});

test("Can edit tags in form", async () => {
  const user = userEvent.setup();
  const recipeData = {
    ...INITIAL_RECIPE_DATA,
    tags: [{ name: "peppery" }, { name: "saucy" }],
  };
  const onSubmit = jest.fn();

  render(
    <MemoryRouter>
      <RecipeForm onSubmit={onSubmit} recipe={recipeData} />
    </MemoryRouter>,
  );

  await user.click(screen.getByTestId("add-tag"));
  await user.click(screen.getByTestId("tag-2"));
  await user.keyboard("new tag");

  const middleTag = screen.getByTestId("tag-1");
  await user.click(middleTag);
  await user.clear(middleTag);
  await user.keyboard("dry");

  await user.click(screen.getByTestId("remove-tag-0"));
  await user.click(screen.getByTestId("submit"));

  expect(onSubmit).toHaveBeenCalledWith({
    ...recipeData,
    tags: [{ name: "dry" }, { name: "new tag" }],
  });
});
