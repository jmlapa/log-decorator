// eslint-disable-next-line no-undef
module.exports = {
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint', 'local-rules'],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended'
  ],
  rules: {
    '@typescript-eslint/explicit-module-boundary-types': 'error',
    "@typescript-eslint/no-explicit-any": "error",
    'local-rules/one-param-only': 'error'
  }
};