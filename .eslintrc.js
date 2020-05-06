module.exports = {
  env: {
    browser: true,
    es6: true,
    node: true
  },
  extends: [
    'plugin:react/recommended',
    'standard',
    'prettier'
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly'
  },
  parser: "babel-eslint",
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: 2018,
    sourceType: 'module'
  },
  plugins: [
    'react',
    'prettier'
  ],
  rules: {
    "prettier/prettier": [
      "error",
      {
        "singleQuote": true,
        "arrowParens": "avoid"
      }
    ],
    "no-console": 1,
    "no-unused-vars": 1,
  },
}
