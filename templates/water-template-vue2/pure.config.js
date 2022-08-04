module.exports = {
  presets: ['vue2'],
  plugins: {
    lint: {
      stylelint: {
        entry: ['src/**/*.scss'],
      },
    },
  },
};
