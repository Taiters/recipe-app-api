import { render } from '@testing-library/react';
import App from './App';

test('Does not error when rendering app', () => {
  expect(() => render(<App />)).not.toThrow();
});
