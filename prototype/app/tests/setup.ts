import { cleanup } from '@testing-library/react';
import { afterEach, beforeEach } from 'vitest';

// jsdom no implementa scrollTo; la app lo llama al cambiar de pantalla.
window.scrollTo = () => {};

beforeEach(() => {
  window.localStorage.clear();
  window.location.hash = '';
});

afterEach(() => {
  cleanup();
});
