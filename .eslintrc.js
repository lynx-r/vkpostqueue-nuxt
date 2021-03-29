module.exports = {
  root: true,
  env: {
    'jest/globals': true
  },
  globals: {
    jest: true
  },
  extends: [
    '@nuxtjs/eslint-config-typescript',
    'plugin:jest/recommended'
  ],
  ignorePatterns: ['**/*.test.*']
}
