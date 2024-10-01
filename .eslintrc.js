const fs = require('fs');
const path = require('path');

const getPaths = () => {
  const pathObject = {};
  const src = path.resolve(__dirname, 'src');
  const paths = fs.readdirSync(src);
  paths.forEach((item) => {
    const itemPath = path.resolve(src, item);
    const stat = fs.statSync(itemPath);
    if (stat.isDirectory()) {
      pathObject[item] = itemPath;
    }
  });

  return pathObject;
};

const internalPaths = Object.keys(getPaths())
  .filter((item) => !item.startsWith('test-utils'))
  .map((v) => [v, `${v}/**`])
  .flat();

module.exports = {
  extends: ['react-app'],
  plugins: ['prettier'],
  rules: {
    'prettier/prettier': [2],
    'no-console': [2],
    'no-debugger': [2],
    '@typescript-eslint/no-unused-vars': [2],
    // hooks
    'react-hooks/rules-of-hooks': [2],
    'react-hooks/exhaustive-deps': [2],
    // import
    'import/order': [
      1,
      {
        groups: ['builtin', 'external', 'internal', ['parent', 'sibling'], 'index', 'object', 'type', 'unknown'],
        pathGroups: [
          {
            pattern: '{react**,@testing-library/**}',
            group: 'builtin',
            position: 'before',
          },
          // test-utils
          {
            pattern: '{test-utils,test-utils/**,@/test-utils,@/test-utils/**}',
            group: 'builtin',
            position: 'before',
          },
          {
            pattern: '{i18n**,lodash,lodash/**,styled**,@atlas/**,classcat}',
            group: 'builtin',
            position: 'before',
          },
          {
            pattern: '{@cobalt/**,@cobalt-marketplace/**}',
            group: 'external',
            position: 'before',
          },
          {
            pattern: '{@/**,@packages/**}',
            group: 'internal',
            position: 'before',
          },
          {
            pattern: `{${internalPaths.join(',')}}`,
            group: 'internal',
            position: 'before',
          },
        ],
        pathGroupsExcludedImportTypes: ['builtin'],
        'newlines-between': 'always',
        alphabetize: {
          order: 'asc',
          caseInsensitive: true,
        },
      },
    ],
  },
};
