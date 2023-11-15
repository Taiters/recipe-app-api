import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import App from './App';
import { useAuthenticatedUser, useAuthentication } from './app/auth';
import { useCreateRecipe, useDeleteRecipe, useRecipe, useRecipes, useUpdateRecipe } from './app/recipes';
import { createRecipe } from './testUtils';

jest.mock('./app/auth', () => ({
  useAuthentication: jest.fn(),
  useAuthenticatedUser: jest.fn(),
  AuthContext: jest.requireActual('./app/auth').AuthContext,
}));

jest.mock('./app/recipes', () => ({
  useRecipe: jest.fn(),
  useRecipes: jest.fn(),
  useCreateRecipe: jest.fn(),
  useUpdateRecipe: jest.fn(),
  useDeleteRecipe: jest.fn(),
}));


const setCurrentUser = (user: { email: string, token: string } | null) => {
  (useAuthentication as jest.Mock).mockReturnValue([
    user,
    jest.fn(),
    jest.fn(),
  ]);
  (useAuthenticatedUser as jest.Mock).mockReturnValue(user);
}

test('Shows auth form when user is not authenticated', () => {
  setCurrentUser(null)
  render(
    <MemoryRouter>
      <App />
    </MemoryRouter>
  );

  expect(screen.getByTestId("auth-form")).toBeInTheDocument()
});

test('Recipe path loads and displays expected recipe', () => {
  const recipe = createRecipe({ id: '123', title: 'a test recipe' });

  setCurrentUser({ email: 'test@example.com', token: '1234' });
  (useRecipe as jest.Mock).mockReturnValue([recipe, false]);
  (useDeleteRecipe as jest.Mock).mockReturnValue([Promise.resolve(), false]);

  render(
    <MemoryRouter initialEntries={["/recipes/123"]}>
      <App />
    </MemoryRouter>
  )

  expect(screen.getByTestId("recipe-detail-123")).toHaveTextContent(recipe.title);
});

test('Recipes path loads and displays all recipes', () => {
  const recipe1 = createRecipe({ id: '1', title: 'a test recipe' });
  const recipe2 = createRecipe({ id: '2', title: 'another recipe' });

  setCurrentUser({ email: 'test@example.com', token: '1234' });
  (useRecipes as jest.Mock).mockReturnValue([[recipe1, recipe2], false]);

  render(
    <MemoryRouter initialEntries={["/recipes"]}>
      <App />
    </MemoryRouter>
  )

  expect(screen.getByTestId("recipe-list").childElementCount).toEqual(2);
  expect(screen.getByTestId("recipe-1")).toHaveTextContent(recipe1.title);
  expect(screen.getByTestId("recipe-2")).toHaveTextContent(recipe2.title);
});

test('Redirects to new recipe detail page after creation', async () => {
  const user = userEvent.setup();
  const recipe = createRecipe({ id: '567' });
  const recipeCreator = jest.fn();

  setCurrentUser({ email: 'test@example.com', token: '1234' });
  (useCreateRecipe as jest.Mock).mockReturnValue([recipeCreator, false]);
  (useRecipe as jest.Mock).mockReturnValue([recipe, false]);
  (useDeleteRecipe as jest.Mock).mockReturnValue([Promise.resolve(), false]);

  recipeCreator.mockReturnValue(Promise.resolve(recipe));

  render(
    <MemoryRouter initialEntries={["/recipes/create"]}>
      <App />
    </MemoryRouter>
  )

  expect(screen.queryByTestId("recipe-detail-567")).not.toBeInTheDocument();
  await user.click(screen.getByTestId("submit"));
  expect(screen.getByTestId("recipe-detail-567")).toBeInTheDocument();
});

test('Redirects to modified recipe detail page after edit', async () => {
  const user = userEvent.setup();
  const recipe = createRecipe({ id: '567' });
  const recipeUpdater = jest.fn();

  setCurrentUser({ email: 'test@example.com', token: '1234' });
  (useUpdateRecipe as jest.Mock).mockReturnValue([recipeUpdater, false]);
  (useRecipe as jest.Mock).mockReturnValue([recipe, false]);
  (useDeleteRecipe as jest.Mock).mockReturnValue([Promise.resolve(), false]);

  recipeUpdater.mockReturnValue(Promise.resolve(recipe));

  render(
    <MemoryRouter initialEntries={["/recipes/567/edit"]}>
      <App />
    </MemoryRouter>
  )

  expect(screen.queryByTestId("recipe-detail-567")).not.toBeInTheDocument();
  expect(screen.getByTestId("recipe-form-567")).toBeInTheDocument();

  await user.click(screen.getByTestId("submit"));

  expect(recipeUpdater).toHaveBeenCalledWith('567', expect.anything());
  expect(screen.getByTestId("recipe-detail-567")).toBeInTheDocument();
  expect(screen.queryByTestId("recipe-form-567")).not.toBeInTheDocument();
});

test('Redirects to recipes list after deleting recipe', async () => {
  const user = userEvent.setup();
  const recipe1 = createRecipe({ id: '1', title: 'a test recipe' });
  const recipe2 = createRecipe({ id: '2', title: 'another recipe' });
  const recipe3 = createRecipe({ id: '3', title: 'another recipe' });

  const recipeDeleter = jest.fn();
  recipeDeleter.mockReturnValue(Promise.resolve());

  setCurrentUser({ email: 'test@example.com', token: '1234' });
  (useRecipe as jest.Mock).mockReturnValue([recipe2, false]);
  (useRecipes as jest.Mock).mockReturnValue([[recipe1, recipe3], false]);
  (useDeleteRecipe as jest.Mock).mockReturnValue([recipeDeleter, false]);

  render(
    <MemoryRouter initialEntries={["/recipes/2"]}>
      <App />
    </MemoryRouter>
  )

  expect(screen.getByTestId("recipe-detail-2")).toBeInTheDocument();

  await user.click(screen.getByTestId("delete"));

  expect(screen.queryByTestId("recipe-detail-2")).not.toBeInTheDocument();
  expect(screen.getByTestId("recipe-list").childElementCount).toEqual(2);
  expect(screen.getByTestId("recipe-1")).toBeInTheDocument();
  expect(screen.getByTestId("recipe-3")).toBeInTheDocument();
});
