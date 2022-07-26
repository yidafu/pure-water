{
  "name": "<%= appName %>",
  "version": "1.0.0",
  "description": "",
  "main": "miniprogram/app.ts",
  "scripts": {
    "prepare": "husky install",
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "author": "yidafu",
  "license": "ISC",
  "devDependencies": {
    "@pure-org/cli": "workspace:*",
    "@pure-org/water-preset-weapp": "workspace:*",
    "@pure-org/eslint-config-water": "workspace:*",
    "@pure-org/stylelint-config-water": "workspace:*",
    "husky": "^8.0.1",
    "lint-staged": "^13.0.3",
    "miniprogram-api-typings": "^2.8.3-1"
  },
  "lint-staged": {
    "*.{js,ts}": "pure lint"
  }
}
