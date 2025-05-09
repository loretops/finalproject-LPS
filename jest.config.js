module.exports = {
  // Default environment is node, which should fix Prisma and TextEncoder issues
  testEnvironment: 'jsdom',
  roots: ['<rootDir>/frontend', '<rootDir>/backend'],
  modulePaths: ['<rootDir>/frontend', '<rootDir>/backend'],
  moduleDirectories: ['node_modules', 'frontend', 'backend'],
  setupFilesAfterEnv: [
    '<rootDir>/frontend/tests/setup.js',
    '<rootDir>/backend/tests/setup.js'
  ],
  testMatch: [
    '<rootDir>/frontend/tests/**/*.test.js',
    '<rootDir>/frontend/**/__tests__/**/*.js',
    '<rootDir>/backend/tests/**/*.test.js'
  ],
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': ['babel-jest', { presets: ['next/babel'] }]
  },
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/frontend/$1',
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy'
  },
  testPathIgnorePatterns: [
    '<rootDir>/node_modules/',
    '<rootDir>/.next/'
  ],
  collectCoverageFrom: [
    'frontend/**/*.{js,jsx,ts,tsx}',
    'backend/**/*.{js,jsx,ts,tsx}',
    '!frontend/**/*.d.ts',
    '!frontend/pages/_app.js',
    '!frontend/pages/_document.js'
  ],
  coverageThreshold: {
    global: {
      branches: 70,
      functions: 70,
      lines: 70,
      statements: 70
    }
  },
  // Add any other global Jest configurations here if needed
  // For example, setupFilesAfterEnv if you create the setup file later:
  // setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  // You might need to configure moduleNameMapper for CSS/image imports if you use them
  // moduleNameMapper: {
  //   '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
  // },
  // Verbose output can sometimes help debugging
  verbose: true,
}; 