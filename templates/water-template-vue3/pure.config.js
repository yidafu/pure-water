module.exports = {
  presets: ['vue'],
  plugins: {
    lint: {
      stylelint: {
        entry: ['src/**/*.scss'],
      },
    },
  },
};
