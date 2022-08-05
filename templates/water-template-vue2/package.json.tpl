{
  "name": "<%= appName =>",
  "version": "0.1.1-beta.9",
  "private": false,
  "scripts": {
    "dev": "pure dev",
    "build": "pure build",
    "lint": "pure lint",
    "prepare": "husky install"
  },
  "dependencies": {
    "core-js": "^3.8.3",
    "vue": "^2.6.14"
  },
  "devDependencies": {
    "@pure-org/cli": "^<%= packageVersion =>",
    "@pure-org/eslint-config-water": "^<%= packageVersion =>",
    "@pure-org/stylelint-config-water": "^<%= packageVersion =>",
    "@pure-org/water-preset-vue2": "^<%= packageVersion =>",
    "husky": "^8.0.1",
    "lint-staged": "^13.0.3"
  },
  "browserslist": [
    "> 2%",
    "not dead"
  ],
  "lint-staged": {
    "*.{js,ts,vue}": "pure lint",
    "*.{css,scss}": "pure lint"
  }
}
