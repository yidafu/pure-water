module.exports = {
  name: '<%= appName =>',
  presets: ['vue2'],
  plugins: {
    lint: {
      stylelint: {
        entry: ['src/**/*.scss'],
      },
    },
  },
};
