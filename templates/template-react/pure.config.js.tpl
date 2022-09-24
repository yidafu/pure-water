module.exports = {
  name: '<%= appName %>',
  presets: ['react'],
  plugins: {
    lint: {
      stylelint: {
        entry: ['src/**/*.css'],
      },
    },
  },
};
