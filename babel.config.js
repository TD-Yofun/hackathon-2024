/*
 *  Talkdesk Confidential
 *
 *  Copyright (C) Talkdesk Inc. 2021
 *
 *  The source code for this program is not published or otherwise divested
 *  of its trade secrets, irrespective of what has been deposited with the
 *  U.S. Copyright Office. Unauthorized copying of this file, via any medium
 *  is strictly prohibited.
 */

function getPlugins(runtime) {
  return [
    [
      '@babel/plugin-transform-runtime',
      runtime
        ? {
            corejs: 3,
          }
        : {},
    ],
  ];
}

const targets = ['last 2 versions and not dead, > 0.3%, Firefox ESR'];

const corejs = {
  presets: [
    [
      '@babel/preset-env',
      {
        modules: false,
        useBuiltIns: 'usage',
        corejs: 3,
        targets,
      },
    ],
    [
      '@babel/preset-react',
      {
        runtime: 'automatic',
      },
    ],
    '@babel/preset-typescript',
  ],
  plugins: getPlugins(),
  env: {
    test: {
      presets: [
        ['@babel/preset-env'],
        [
          '@babel/preset-react',
          {
            runtime: 'automatic',
          },
        ],
        '@babel/preset-typescript',
        [
          'babel-preset-vite',
          {
            env: true,
            glob: false,
          },
        ],
      ],
      plugins: getPlugins(),
    },
  },
};

module.exports = corejs;
