// Configuración para pruebas de Jest en el frontend
import '@testing-library/jest-dom';

// Mock para localStorage
class LocalStorageMock {
  constructor() {
    this.store = {};
  }

  clear() {
    this.store = {};
  }

  getItem(key) {
    return this.store[key] || null;
  }

  setItem(key, value) {
    this.store[key] = String(value);
  }

  removeItem(key) {
    delete this.store[key];
  }
}

// Establecer el mock de localStorage antes de cada prueba
global.localStorage = new LocalStorageMock();

// Mock de fetch
global.fetch = jest.fn(() =>
  Promise.resolve({
    ok: true,
    json: () => Promise.resolve({}),
    text: () => Promise.resolve(''),
    status: 200,
    statusText: 'OK',
    clone: function() { return this; }
  })
);

// Mock para Next Router
jest.mock('next/router', () => ({
  useRouter: jest.fn().mockImplementation(() => ({
    query: {},
    pathname: '/',
    asPath: '/',
    events: {
      on: jest.fn(),
      off: jest.fn(),
      emit: jest.fn()
    },
    push: jest.fn(),
    replace: jest.fn(),
    reload: jest.fn(),
    back: jest.fn(),
    prefetch: jest.fn(),
    beforePopState: jest.fn(),
    isReady: true
  }))
}));

// Suprimir los warnings de console durante las pruebas (opcional)
// Esto puede ayudar a mantener la salida más limpia
// global.console = {
//   ...console,
//   warn: jest.fn(),
//   error: jest.fn()
// };

// Establecer variables de entorno para pruebas
process.env.NEXT_PUBLIC_API_URL = 'http://localhost:8001/api';

// Configuración para timeouts más largos en pruebas que requieren respuestas de API
jest.setTimeout(30000); // 30 segundos 