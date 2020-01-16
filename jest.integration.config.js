// For a detailed explanation regarding each configuration property, visit:
// https://jestjs.io/docs/en/configuration.html

module.exports = {
  clearMocks: true,
  testEnvironment: 'node',
  coverageDirectory: 'coverage',
  testMatch: ['**/src/**/?(*.)+(integration.spec|integration.test).js', '!**/src/main/**']
}
