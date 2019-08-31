module.exports = {
  env: {
    es6: true,
    node: true,
  },
  plugins:[
    'prettier'
   ],
  extends: [
    'airbnb-base',
    'prettier'
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  rules: {
    // Overriding some airbnb rules
    'class-methods-use-this': 'off',
    'no-param-reassign': 'off',
    'camelcase': 'off',
    'no-unused-vars': ['error', {'argsIgnorePattern': 'next'}],
    'prettier/prettier': 'error',
  },
};
