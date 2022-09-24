{
  "name": "<%= appName %>",
  "private": false,
  "version": "0.0.0",
  "scripts": {
    "dev": "pure dev",
    "build": "pure build",
    "lint": "pure lint"
  },
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0"
  },
  "devDependencies": {
    "@pure-org/cli": "^<%= packageVersion %>",
    "@pure-org/water-preset-react": "^<%= packageVersion %>",
    "@pure-org/eslint-config-water": "^<%= packageVersion %>",
    "@pure-org/stylelint-config-water": "^<%= packageVersion %>",
    "@pure-org/tsconfig": "^<%= packageVersion %>",
    "@types/react": "^18.0.17",
    "@types/react-dom": "^18.0.6",
    "@vitejs/plugin-react": "^2.1.0",
    "husky": "^8.0.1",
    "typescript": "^4.6.4",
    "vite": "^3.1.0",
    "lint-staged": "^13.0.3"
  },
  "lint-staged": {
    "*.{ts,tsx}": "pure lint -e",
    "*.{css,scss}": "pure lint -s"
  }
}