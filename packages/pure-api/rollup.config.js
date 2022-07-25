import typescript from '@rollup/plugin-typescript';

module.exports = {
  input: 'src/index.ts',
  output: {
    dir: 'lib',
    format: 'esm',
  },
  plugins: [typescript()],
};
