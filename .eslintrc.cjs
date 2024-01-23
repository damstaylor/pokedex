module.exports = {
  root: true,
  env: { browser: true, es2021: true, jest: true },
  extends: [
    'airbnb',
    'prettier',
    'plugin:@typescript-eslint/recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'standard-with-typescript',
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs', 'commitlint.config.cjs', 'jest.config.ts', 'vite.config.ts', 'vite-env.d.ts'],
  parser: '@typescript-eslint/parser',
  plugins: ['prettier', 'react', 'react-refresh'],
  rules: {
    'react/jsx-filename-extension': [2, { extensions: ['.js', '.jsx', '.ts', '.tsx'] }],
    'react/react-in-jsx-scope': 'off',
    '@typescript-eslint/space-before-function-paren': 'off',
  },
};
