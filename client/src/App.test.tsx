import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from './App';
import { useAuthenticatedUser, useAuthentication } from './app/auth';
import { useRecipe } from './app/recipes';
import { createRecipe } from './test-utils';

jest.mock('./app/auth', () => ({
  useAuthentication: jest.fn(),
  useAuthenticatedUser: jest.fn(),
  AuthContext: jest.requireActual('./app/auth').AuthContext,
}));

jest.mock('./app/recipes', () => ({
  useRecipe: jest.fn(),
}));


const setCurrentUser = (user: { email: string, token: string } | null) => {
  useAuthentication.mockReturnValue([
    user,
    jest.fn(),
    jest.fn(),
  ]);
  useAuthenticatedUser.mockReturnValue(user);
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
  const recipe = createRecipe({ id: '123', name: 'a test recipe' });

  setCurrentUser({ email: 'test@example.com', token: '1234' })
  useRecipe.mockReturnValue(recipe);

  render(
    <MemoryRouter initialEntries={["/recipes/123"]}>
      <App />
    </MemoryRouter>
  )

  expect(screen.getByTestId("recipe-123")).toHaveTextContent(recipe.name);
});
