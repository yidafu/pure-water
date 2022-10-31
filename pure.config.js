module.exports = {
  name: 'pure-water',
  presets: ['vue'],
  plugins: {
    lint: {
      eslint: {
        entry: ['packages/**/*.ts'],
      },
      stylelint: {
        disable: true,
      },
    },
  },
};
