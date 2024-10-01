import { join } from 'path';

// plugins
import babel from '@rollup/plugin-babel';
import react from '@vitejs/plugin-react';
import { visualizer } from 'rollup-plugin-visualizer';
import { defineConfig, splitVendorChunkPlugin, PluginOption, loadEnv } from 'vite';
import checker from 'vite-plugin-checker';
import compression from 'vite-plugin-compression';
import tsconfig from 'vite-tsconfig-paths';

export default defineConfig(({ mode }) => {
  const envDir = join(__dirname, './.env');
  const envPrefix = ['REACT_APP'];

  const env = loadEnv(mode, envDir, envPrefix);

  return {
    base: './',
    mode,
    optimizeDeps: {
      esbuildOptions: {
        loader: {
          '.js': 'jsx',
          '.ts': 'tsx',
        },
      },
    },
    publicDir: join(__dirname, './public'),
    envDir,
    envPrefix,
    plugins: [
      react(),
      checker({
        typescript: true,
        eslint: { lintCommand: 'eslint "./src/**/*.{ts,tsx,js,jsx}"', dev: { logLevel: ['error'] } },
      }),
      tsconfig(),
      splitVendorChunkPlugin(),
      babel({ babelHelpers: 'runtime', exclude: [/node_modules/] }) as PluginOption,
      visualizer() as PluginOption,
      compression(),
    ],
    resolve: {
      alias: {
        '@': join(__dirname, './src'),
      },
    },
    server: {
      host: 'localhost',
    },
    build: {
      sourcemap: true,
      minify: mode === 'production' ? 'esbuild' : false,
      outDir: 'build',
    },
    define: {
      'process.env': env,
    },
  };
});
