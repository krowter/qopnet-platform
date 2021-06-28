# Qopnet Platform

Qopnet Platform (@qopnet) handle these apps:

- [Qopnet API](https://api.qopnet.id)
- [Qopnet Admin](https://admin.qopnet.id)
- Qopnet Commerce
- Qopnet Concierge
- Qopnet POS

Check the complete technical documentation in [the `docs` folder](./docs/README.md).

## Monorepo with Nx Workspace

This project was generated using [Nx](https://nx.dev) workspace.

🔎 **Nx is a smart, extensible build framework**

## Setup environment variables

Environment variables declared in `.env` and `.env.local` are automatically made available to Prisma.

- See the documentation for more detail: https://pris.ly/d/prisma-schema#using-environment-variables
- Prisma supports the native connection string format for PostgreSQL, MySQL, SQL Server and SQLite.
- See the documentation for all the connection string options: https://pris.ly/d/connection-strings

### References

- https://dev.to/prisma/set-up-a-free-postgresql-database-on-supabase-to-use-with-prisma-3pk6
- https://www.prisma.io/blog/full-stack-typesafety-with-angular-nest-nx-and-prisma-CcMK7fbQfTWc

## Adding capabilities to your workspace

Nx supports many plugins which add capabilities for developing different types of applications and different tools.

These capabilities include generating applications, libraries, etc as well as the devtools to test, and build projects as well.

Below are Nx core plugins:

- [Node](https://nodejs.org)
  - `npm install --save-dev @nrwl/node`
- [Express](https://expressjs.com)
  - `npm install --save-dev @nrwl/express`
- [Nest](https://nestjs.com)
  - `npm install --save-dev @nrwl/nest`
- [React](https://reactjs.org)
  - `npm install --save-dev @nrwl/react`
- Web (no framework frontends)
  - `npm install --save-dev @nrwl/web`

There are also many [community plugins](https://nx.dev/nx-community) you could add.

## Generate an application

Run `nx g @nrwl/react:app my-app` to generate an application.

> You can use any of the plugins above to generate applications as well.

When using Nx, you can create multiple applications and libraries in the same workspace.

## Generate a library

Run `nx g @nrwl/react:lib my-lib` to generate a library.

> You can also use any of the plugins above to generate libraries as well.

Libraries are shareable across libraries and applications. They can be imported from `@qopnet/mylib`.

## Development server

Run `nx serve my-app` for a dev server. Navigate to http://localhost:4200/. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `nx g @nrwl/react:component my-component --project=my-app` to generate a new component.

## Build

Run `nx build my-app` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `nx test my-app` to execute the unit tests via [Jest](https://jestjs.io).

Run `nx affected:test` to execute the unit tests affected by a change.

## Running end-to-end tests

Run `ng e2e my-app` to execute the end-to-end tests via [Cypress](https://www.cypress.io).

Run `nx affected:e2e` to execute the end-to-end tests affected by a change.

## Understand your workspace

Run `nx dep-graph` to see a diagram of the dependencies of your projects.

## Further help

Visit the [Nx Documentation](https://nx.dev) to learn more.

## ☁ Nx Cloud

### Distributed Computation Caching & Distributed Task Execution

<p style="text-align: center;"><img src="https://raw.githubusercontent.com/nrwl/nx/master/images/nx-cloud-card.png"></p>

Nx Cloud pairs with Nx in order to enable you to build and test code more rapidly, by up to 10 times. Even teams that are new to Nx can connect to Nx Cloud and start saving time instantly.

Teams using Nx gain the advantage of building full-stack applications with their preferred framework alongside Nx’s advanced code generation and project dependency graph, plus a unified experience for both frontend and backend developers.

Visit [Nx Cloud](https://nx.app) to learn more.
