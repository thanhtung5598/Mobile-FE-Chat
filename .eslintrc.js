module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true
  },
  extends: ['eslint:recommended', 'plugin:react/recommended', 'prettier'],
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: 12,
    sourceType: 'module'
  },
  plugins: ['react', 'prettier', 'react-hooks'],
  rules: {
    'react/prop-types': ['error'],
    'react-hooks/rules-of-hooks': ['error'], // Checks rules of Hooks
    'react-hooks/exhaustive-deps': 'warn', // Checks effect dependencies
    'prettier/prettier': [
      'error',
      {
        endOfLine: 'auto'
      }
    ],
    'no-undef': 0,
    'react/react-in-jsx-scope': 0,
    'react/display-name': 0,
    'object-curly-spacing': 0
  }
};
