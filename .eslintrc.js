module.exports = {
  root: true,
  extends: ['@react-native-community', 'prettier'],
  plugins: ['prettier', 'react-hooks'],
  rules: {
    'react/prop-types': ['error'],
    'react-hooks/rules-of-hooks': ['error'], // Checks rules of Hooks
    'react-hooks/exhaustive-deps': 'warn', // Checks effect dependencies
    'prettier/prettier': [
      'error',
      {
        endOfLine: 'auto',
      },
    ],
    'no-undef': 0,
    'react/react-in-jsx-scope': 0,
    'react/display-name': 0,
    'object-curly-spacing': 0,
  },
};
