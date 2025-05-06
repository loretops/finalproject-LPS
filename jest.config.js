module.exports = {
  // Default environment is node, which should fix Prisma and TextEncoder issues
  testEnvironment: 'node',
  // Add any other global Jest configurations here if needed
  // For example, setupFilesAfterEnv if you create the setup file later:
  // setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  // You might need to configure moduleNameMapper for CSS/image imports if you use them
  // moduleNameMapper: {
  //   '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
  // },
  // Verbose output can sometimes help debugging
  // verbose: true,
}; 