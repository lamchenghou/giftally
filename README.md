# User Guide

## Introduction

The joyous season of Christmas is just round the corner, and the spirit of giving is glowing. Alas! Details of our departments and staff are condense in an excel sheet. As a fullstack developer, I have set out to develop GiftAlly–Your Ally in Giving, such that none of our fellow employeers go home empty-handed!

## Getting started

As this is a fullstack application, without deployment, we need to first **setup the database**. \
`npm` comands have been added for your convenience. This guide has been smoke-tested on MacOS Ventura (Apple M1).

### To setup the database

1. Ensure you have a local postgres server running. (Relevant guides: [MacOS](https://www.atlassian.com/data/admin/how-to-start-postgresql-server-on-mac-os-x), [Windows](https://www.prisma.io/dataguide/postgresql/setting-up-a-local-postgresql-database))
2. In the `.env` file in the `backend` folder (committed for this project), modify `DATABASE_URL` to follow your PostgreSQL user credentials

An example if given below:

```
DATABASE_URL="postgresql://ally:yourallyingivingthebestgifts@localhost:5432/giftallydb?schema=public"
```

3. Go to the root folder `GiftAlly` (same folder as this `README.md`) and execute:

```
npm run setup-db
```

This will both create the db in postgres and seed it with all the data parsed from `staff-id-to-team-mapping-long.csv` (and a bit of additional seed data to test the pagination functionality). If you run into no errors, your database is now ready! Feel free to contact me at `lamchenghou@u.nus.edu` if there are any issues with this! (There is also a backup `.sql` file at `/backend/prisma/giftallydb_backup.sql`)

### To run the application

1. Go to the root folder `GiftAlly` and execute:

```
npm run giftally
```

2. This will run the REST server and React App concurrently. You can access the app at [`http://localhost:5173/`](http://localhost:5173/)

### To test the application

1. Go to the root folder GiftAlly and execute:

```
npm test
```

2. This should execute the `vitest` test code.

## Features & Assumptions Made

### Features

There are two directions in which this app can head towards. One is catered towards employees, where each employee can lookup their Staff Pass ID, and the other is where a facilitator can utilise the app to handle distribution records. The former would focus on interaction between app and collectors, and the latter would be much more practical. **I have decided to go with the latter, while still making it feasible for collectors themselves to use it for redemption (if you trust your employees not to redeem more than once 😆)**.

GiftAlly supports the following user-facing features:

1. You can perform a lookup on any staff ID present in the database. After typing
   ≥3 characters, suggestions would be provided to you.
2. Upon selection of any staff ID, the corresponding team (e.g. `RAVENCLAW`)
   and redemption eligibility would be displayed.
3. Given eligibility information, you can choose to `Redeem` if the team is
   eligible.
4. Upon redemption, a new record would be added to the history below. The history
   is sorted by descending order of time.
5. A notification pop-up will also show, indicating to you how many employees
   belong to that team\*.
6. You may view the list of teams in the `Team List` page, with the option to
   `Unredeem` for a team (say you made a mistake).

Other features to explore includes:

- `404` page: try navigating to a random route e.g. [`http://localhost:5173/hello`](http://localhost:5173/hello)

Features 5-6 are out of the scope, but they would be very needed in
a real application. \
\*The notification pop-up remains for 10s, but a more permanent feature should be added to display the number of employees in each team.

### Main Assumptions Made

- One redemption per team
- Each staff member has a unique staff pass ID.
- Only 1 user is using the system at one time. (Although we check for eligibility
  upon redemption. There might still be similar calls to the backend API, and race condition is not really focused on in this implementation.
- There is no need to update team and staff details on the app directly.
- There is no need to show when a staff record was created at.
- A proper datetime view is preferable over epoch ms, but a tooltip is added
  to show epoch ms.
- We are in Singapore, as the date format is fixed as UTC+8.

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

### Running the app and server

In the root folder, frontend and backend folder, do:

```
npm install
```

In the frontend and backend folder, do:

```
npm run dev
```

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

### Setting up database

Refer to the User Guide to setup the database. The User Guide also contains useful commands.

# Design choices

## Folder Structure

> There are only two hard things in Computer Science: cache invalidation and naming things.
> — Phil Karlton \
> The project structure I will be using closely follows that of ['bulletproof-react'
> on GitHub](https://github.com/alan2207/bulletproof-react/blob/master/docs/project-structure.md).
> There are several
> different ways to organise the project structure, but there is an attempt to
> maintain the separation of concerns.

# Libraries / Frameworks / Tools used

## Vite + Vitest

Vite is a modern and popular preference for a build tool. Along with vitest, it is robustly useful.

## React Router v6

In this mini project, we explore the new `createBrowserRouter` under v6. The
ease of use makes it an attractive choice.

## ESLint / Prettier

An industry standard linter for Typescript, allowing me to maintain consistent styling across my files.

## PostgreSQL + Prisma + Express

Easy to use, and suitable for bringing an app to live quickly.

## Ant Design

One of the best UI frameworks out there!

## TailwindCSS

Allows for neat and fast styling. However, we try to maintain a theme for consistency.

## Jest + Vitest + React Testing Libraries

Although this is my first time using such web-based testing frameworks, I have to say that this combi is quite good to work with!

# User Stories

The initial brainstorming process.

| User Story                                                                                                                                              | Importance |
| ------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------- |
| As a welfare gift distributor, I can input the staff ID of the collector, so that I can view his/her eligibility for collection and collection history. | \*\*\*     |
| As a welfare gift distributor, I can indicate that a team has redeemed their gift, so that I can keep track of the collection process.                  | \*\*\*     |
| As a welfare gift distributor, I can undo the redemption for a team, so that I can rectify errors.                                                      | \*\*       |
| As a welfare gift distributor, I can add a team to be eligible for collection.                                                                          | \*\*       |
