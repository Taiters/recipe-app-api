import { render } from '@testing-library/react';
import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import App from './App';

test('Does not error when rendering app', () => {
  expect(() => render(
    <MemoryRouter>
      <App />
    </MemoryRouter>
  )).not.toThrow();
});
