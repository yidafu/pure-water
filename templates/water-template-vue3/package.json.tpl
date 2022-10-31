{
  "name": "<%= appName %>",
  "private": false,
  "version": "1.0.0",
  "scripts": {
    "lint": "pure lint",
    "dev": "pure dev",
    "build": "pure build"
  },
  "files": [
    "src/*",
    "public/*",
    ".husky/*",
    ".github/*",
    ".stylelintrc.js",
    ".eslintrc.js",
    ".gitignore",
    "index.html",
    "package.json",
    "package.json.tpl",
    "pure.config.js.tpl",
    "README.md.tpl",
    "tsconfig.json"
  ],
  "publishConfig": {
    "registry": "https://registry.npmjs.org"
  },
  "dependencies": {
    "element-plus": "^2.2.19",
    "pinia": "^2.0.23",
    "vue": "^3.2.37",
    "vue-router": "^4.1.6"
  },
  "devDependencies": {
    "@pure-org/cli": "^<%= packageVersion %>",
    "@pure-org/eslint-config-water": "^<%= packageVersion %>",
    "@pure-org/tsconfig": "^<%= packageVersion %>",
    "@pure-org/water-preset-vue": "^<%= packageVersion %>",
    "husky": "^8.0.1",
    "lint-staged": "^13.0.3",
    "typescript": "^4.7.4",
    "unplugin-auto-import": "^0.11.4",
    "unplugin-element-plus": "^0.4.1",
    "unplugin-vue-components": "^0.22.9",
    "vite": "^3.0.4",
    "vue-tsc": "^0.38.4"
  },
  "lint-staged": {
    "*.{js,ts,vue}": "pure lint",
    "*.{css,scss}": "pure lint"
  }
}