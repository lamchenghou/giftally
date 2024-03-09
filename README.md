> Disclaimer: I keep writing in 'we' language–I'm guessing because most of my SWE experience is in teams, but I can
> assure you that this project is 100% done by me! HAHA

# Developer's Guide

## Stack Chosen

This stack is inspired by the T3 stack.

I chose fullstack with a React Typescript + Vite + NodeJS frontend, and a Typescript + Express + NodeJS backend. The backend communicates with
a PostgreSQL server via the Prisma ORM, and establishes a RESTful API
on port 3000. The frontend communicates with the RestApi via axios.

> A quick note that I am integrating so many technologies together in
> order to demonstrate my ability to do fullstack. The scope of the
> assignment is indeed very small, and this fullstack approach is more
> suitable for a larger-scale application. However, this is my first time
> working with Prisma & Express, so I'm also glad I learnt something!
> It is also noteworthy to mention that frontend and backend codebases
> should be separate, instead of being under the same folder.

## Quick Start

### Running the app

> 1. `npm install`
> 2. `npm run dev`

### Enabling Prettier Code Formatter & Eslint (VSCode)

We use prettier to format the code and ESLint to highlight the issues.

> 1. Ensure dependencies are installed.
> 2. Assuming you're using VSCode, install the `Prettier - Code Formatter` extension.
> 3. In VSCode settings, set your formatter to be `Prettier - Code formatter`
>    and tick `Format on Save`.
> 4. Optionally, you may choose to download the `ESLint` plugin. This highlight style and code problems, and
>    we have provided an eslintrc.cjs file to disable some unnecessary rules, such that there are minimal
>    conflict between ESLint and Prettier styles.
> 5. VSCode will now warn you on coding style and standard violations, and auto-format on save.

# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default {
  // other rules...
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json', './tsconfig.node.json'],
    tsconfigRootDir: __dirname,
  },
};
```

- Replace `plugin:@typescript-eslint/recommended` to `plugin:@typescript-eslint/recommended-type-checked` or `plugin:@typescript-eslint/strict-type-checked`
- Optionally add `plugin:@typescript-eslint/stylistic-type-checked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and add `plugin:react/recommended` & `plugin:react/jsx-runtime` to the `extends` list

# Design choices

## Folder Structure

> There are only two hard things in Computer Science: cache invalidation and naming things.
> — Phil Karlton \
> The project structure I will be using closely follows that of ['bulletproof-react'
> on GitHub](https://github.com/alan2207/bulletproof-react/blob/master/docs/project-structure.md).
> This format was introduced to me by a colleague at Synapxe. There are several
> different ways to organise the project structure, but there is an attempt to
> maintain the separation of concerns.

# Libraries / Frameworks / Tools used

## React Router v6

In this mini project, we explore the new `createBrowserRouter` under v6. The
ease of use makes it an attractive choice.

## React-redux

For state management across pages. It is good practice to try to utilise the
browser disk cache as much as possible, and resorting to local/sessionStorage
as and when needed.

A basic selector, action creator, reducer structure is used.

## ESLint / Prettier

An industry standard linter for Typescript, allowing me to maintain consistent styling across my files.

# SDLC

The below documents the development process, and closely follows a full SDLC.

## User Stories

| User Story                                                                                                                                              | Importance |
| ------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------- |
| As a welfare gift distributor, I can input the staff ID of the collector, so that I can view his/her eligibility for collection and collection history. | \*\*\*     |
| As a welfare gift distributor, I can indicate that a team has redeemed their gift, so that I can keep track of the collection process.                  | \*\*\*     |
| As a welfare gift distributor, I can add a team (and therefore collector staff id) to be eligible for collection.                                       | \*\*       |
| As a welfare gift distributor, I can add a team to be eligible for collection.                                                                          | \*\*       |
