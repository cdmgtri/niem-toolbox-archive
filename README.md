
# NIEM Tool Template

This project provide a Vue project template to leverage for building a NIEM single-page application (SPA), hosted on GitHub Pages.

This template was developed using [Vue CLI 3](https://cli.vuejs.org/).

## Features

- Vue SPA template
- Vue router initialized
- Vuex initialized (state management for sharing data across components)
- Bootstrap and Vue-Bootstrap loaded
- NIEM website-style header and footer menu
- Scripts to serve (with live-reloading), build, and deploy app

## Getting started

Clone this project into a directory named appropriately for your project:

```bash
git clone https://github.com/cdmgtri/niem-tool-template-vue my-app-name
```

Install dependencies:

```bash
npm install
npm rebuild node-sass
```

Make adjustments to the following files:

| File | Steps |
| ---- | ----- |
| `package.json` | Update `name` and `description`. |
| `vue.config.js` | Update `baseURL` to your GitHub repo name. |
| `public/index.html` | Updated `title` to your app name. |
| `src/components/HeaderBrand.vue` | Update "Tool Template" to your app name. |
| `src/views/About.vue` | Update the repo name to report an issue. |
| `src/scripts/git/push-dist.sh` | Updated the `origin` value to the name of your remote repo. |
| `README.md` | Replace these instructions with a real README for your project. |

## Usage

**Run app locally:**

```bash
npm run serve
```

**Deploy app to GitHub Pages:**

```bash
npm run deploy
```

## Updates

To update Vue dependencies:

```bash
yarn global add @vue/cli-upgrade
vue upgrade
```
