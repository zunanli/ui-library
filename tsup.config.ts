import { defineConfig } from 'tsup';

export default defineConfig({
  entry: {
    'index': 'src/index.ts',
    'components/Button/index': 'src/components/Button/index.ts',
    'components/Card/index': 'src/components/Card/index.ts',
    'components/Input/index': 'src/components/Input/index.ts',
    'components/Select/index': 'src/components/Select/index.ts',
    'components/Modal/index': 'src/components/Modal/index.ts',
    'components/Toast/index': 'src/components/Toast/index.ts',
    'themes/index': 'src/themes/index.ts',
    'utils/index': 'src/utils/index.ts',
  },
  format: ['esm', 'cjs'],
  dts: true,
  splitting: true,
  clean: true,
  external: ['react', 'react-dom'],
  treeshake: true,
  sourcemap: true,
  minify: true,
  target: 'es2020',
  loader: {
    '.css': 'css'
  },
  outExtension({ format }) {
    return {
      js: format === 'cjs' ? '.cjs' : '.js',
      css: '.css'
    };
  }
}); 