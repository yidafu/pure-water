module.exports = {
  name: 'pure-water',
  presets: ['vue'],
  plugins: {
    lint: {
      eslint: {
        entry: ['packages/**/*.ts', 'packages/**/*.ts'],
      },
      stylelint: {
        disable: true,
      },
    },
  },
};
