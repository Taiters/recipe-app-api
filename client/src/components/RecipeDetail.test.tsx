import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import { createRecipe } from "../testUtils";
import RecipeDetail from "./RecipeDetail";

test("Shows relevant recipe information", async () => {
  const recipe = createRecipe();
  render(
    <MemoryRouter>
      <RecipeDetail recipe={recipe} onDelete={jest.fn()} />
    </MemoryRouter>,
  );

  const tagsList = screen.getByTestId("tags");
  const ingredientsList = screen.getByTestId("ingredients");

  expect(screen.getByTestId("title")).toHaveTextContent(recipe.title);
  expect(screen.getByTestId("description")).toHaveTextContent(
    recipe.description,
  );
  expect(screen.getByTestId("time")).toHaveTextContent(
    `${recipe.time_minutes} minutes`,
  );
  expect(screen.getByTestId("price")).toHaveTextContent(`£${recipe.price}`);

  expect(tagsList.childElementCount).toEqual(recipe.tags.length);
  recipe.tags.forEach((t) => expect(tagsList).toHaveTextContent(t.name));

  expect(ingredientsList.childElementCount).toEqual(recipe.ingredients.length);
  recipe.ingredients.forEach((i) =>
    expect(ingredientsList).toHaveTextContent(i.name),
  );

  expect(screen.queryByTestId("image")).not.toBeInTheDocument();
});

test("Shows image when available", async () => {
  const recipe = createRecipe({
    image: "http://example.com/the-image-url.jpg",
  });

  render(
    <MemoryRouter>
      <RecipeDetail recipe={recipe} onDelete={jest.fn()} />
    </MemoryRouter>,
  );

  expect(screen.getByTestId("image")).toHaveAttribute("src", recipe.image);
});

test("Omits tags list where there is none", () => {
  const recipe = createRecipe({
    tags: [],
  });

  render(
    <MemoryRouter>
      <RecipeDetail recipe={recipe} onDelete={jest.fn()} />
    </MemoryRouter>,
  );

  expect(screen.queryByTestId("tags")).not.toBeInTheDocument();
});

test("Omits ingredients list where there is none", () => {
  const recipe = createRecipe({
    ingredients: [],
  });

  render(
    <MemoryRouter>
      <RecipeDetail recipe={recipe} onDelete={jest.fn()} />
    </MemoryRouter>,
  );

  expect(screen.queryByTestId("ingredients")).not.toBeInTheDocument();
});

test("Clicking delete button triggers the onDelete callback", async () => {
  const user = userEvent.setup();
  const recipe = createRecipe();
  const onDelete = jest.fn();

  render(
    <MemoryRouter>
      <RecipeDetail recipe={recipe} onDelete={onDelete} />
    </MemoryRouter>,
  );

  await user.click(screen.getByTestId("delete"));

  expect(onDelete).toHaveBeenCalledTimes(1);
});
