// For a detailed explanation regarding each configuration property, visit:
// https://jestjs.io/docs/en/configuration.html

module.exports = {
  clearMocks: true,
  testEnvironment: 'node',
  testMatch: ['**/src/**/*.[jt]s?(x)', '**/src/?(*.)+(spec|test).[tj]s?(x)', '!**/src/main/**']
}
