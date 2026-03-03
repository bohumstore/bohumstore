import nextVitals from 'eslint-config-next/core-web-vitals';

const eslintConfig = [
  ...nextVitals,
  {
    rules: {
      'react/no-unescaped-entities': 'off',
      'no-unused-vars': ['warn', { argsIgnorePattern: '^_', varsIgnorePattern: '^_', caughtErrorsIgnorePattern: '^_' }],
      'react-hooks/exhaustive-deps': 'warn',
      '@next/next/no-img-element': 'off',
    },
  },
  {
    // Prettier rules are applied last to override conflicting ESLint rules
    files: ['**/*.{js,jsx,ts,tsx}'],
    rules: {
      indent: 'off',
    },
  },
];

export default eslintConfig;
