import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from './App';
import { useAuthenticatedUser, useAuthentication } from './app/auth';
import { useRecipe, useRecipes } from './app/recipes';
import { createRecipe } from './testUtils';

jest.mock('./app/auth', () => ({
  useAuthentication: jest.fn(),
  useAuthenticatedUser: jest.fn(),
  AuthContext: jest.requireActual('./app/auth').AuthContext,
}));

jest.mock('./app/recipes', () => ({
  useRecipe: jest.fn(),
  useRecipes: jest.fn(),
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
