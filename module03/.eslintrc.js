module.exports = {
  env: {
    es6: true,
    node: true,
  },
  extends: [
    'airbnb-base',
    'prettier'
  ],
  plugins:[
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
    // forces a class always use this to access methods
    'class-methods-use-this': 'off', 
    'no-param-reassign': 'off', // not allow reassign a param
    'camelcase': 'off', // force all variables to follow camelcase
    // ignore unused declared var if the var name is next, 
    // we will need to at following classes
    'no-unused-vars': ['error', { 'argsIgnorePattern': 'next'}],
    // prettier rules are considered errors
    'prettier/prettier': 'error',
  },
};
