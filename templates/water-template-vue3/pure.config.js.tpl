module.exports = {
  name: '<%= appName =>',
  presets: ['vue'],
  plugins: {
    lint: {
      stylelint: {
        entry: ['src/**/*.scss'],
      },
    },
  },
};
