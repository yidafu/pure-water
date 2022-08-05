{
  "name": "<%= appName %>",
  "private": true,
  "scripts": {
    "dev": "pure dev",
    "build": "vue-tsc --noEmit && pure build",
    "lint": "pure lint",
    "prepare": "husky install"
  },
  "dependencies": {
    "vue": "^3.2.37"
  },
  "devDependencies": {
    "@pure-org/cli": "^<%= packageVersion %>",
    "@pure-org/eslint-config-water": "^<%= packageVersion %>",
    "@pure-org/stylelint-config-water": "^<%= packageVersion %>",
    "@pure-org/water-preset-vue": "^<%= packageVersion %>",
    "husky": "^8.0.1",
    "lint-staged": "^13.0.3",
    "typescript": "^4.6.4",
    "vite": "^3.0.4",
    "vue-tsc": "^0.38.4"
  },
  "lint-staged": {
    "*.{js,ts,vue}": "pure lint",
    "*.{css,scss}": "pure lint"
  }
}
