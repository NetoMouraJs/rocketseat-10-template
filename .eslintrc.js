module.exports = {
  env: {
    browser: true,
    es6: true,
    jest: true,
    mongo:true
  },
  extends: [
    'standard'
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly'
  },
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module'
  },
  rules: {
    camelcase: [0, { ignoreDestructuring: true }]
  }
}
