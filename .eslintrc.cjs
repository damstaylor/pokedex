module.exports = {
  root: true,
  env: { browser: true, es2021: true, jest: true },
  extends: [
    'plugin:jsx-a11y/recommended',
    'plugin:react-hooks/recommended',
    'prettier',
  ],
  parserOptions: {
    project: './tsconfig.json',
  },
  ignorePatterns: [
    'dist',
    '.eslintrc.cjs',
    'commitlint.config.cjs',
    'jest.config.ts',
    'vite.config.ts',
    'vite-env.d.ts',
  ],
  plugins: ['prettier'],
  rules: {
    'import/extensions': [
      'error',
      'ignorePackages',
      { js: 'never', jsx: 'never', ts: 'never', tsx: 'never' },
    ],
    'no-multiple-empty-lines': ['error', { max: 1, maxEOF: 0 }],
    'react/function-component-definition': [
      'error',
      { namedComponents: 'arrow-function' },
    ],
    'react/jsx-filename-extension': [
      2,
      { extensions: ['.js', '.jsx', '.ts', '.tsx'] },
    ],
    'react/react-in-jsx-scope': 'off',
    '@typescript-eslint/space-before-function-paren': 'off',
  },
};
