import nextCoreWebVitals from 'eslint-config-next/core-web-vitals';

// ESLint 9 flat config; Next 16 removed `next lint`.
const eslintConfig = [
  { ignores: ['.next/**', 'out/**', 'node_modules/**', 'legacy/**', 'output/**', 'scripts/**', 'public/**'] },
  ...nextCoreWebVitals,
  {
    rules: {
      'react/no-unescaped-entities': 'off',
    },
  },
];

export default eslintConfig;
