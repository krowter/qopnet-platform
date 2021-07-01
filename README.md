# Qopnet Platform

Qopnet Platform (@qopnet) project was generated using [Nx](https://nx.dev) workspace. Nx is a smart, extensible build framework.

This repo handle these apps:

- Qopnet API
  - [api.qopnet.id](https://api.qopnet.id)
  - [qopnet-api.catamyst.com](https://qopnet-api.catamyst.com)
- Qopnet Admin
  - [admin.qopnet.id](https://admin.qopnet.id)
  - [qopnet-admin.catamyst.com](https://qopnet-admin.catamyst.com)
- Qopnet Commerce
  - [qopnet.id](https://qopnet.id)
- Qopnet Concierge
  - [concierge.qopnet.id](https://concierge.qopnet.id)
  - [chat.qopnet.id](https://chat.qopnet.id)
- Qopnet POS
  - [pos.qopnet.id](https://pos.qopnet.id)
- Qopnet WA (`chat_zero`)
  - [wa.qopnet.id](https://wa.qopnet.id)

Check the complete technical documentation in [the `docs` folder](./docs/README.md).

## Known URL (host and port)

- `http://localhost:5555` - Prisma Studio
- `http://localhost:4000` - Qopnet API
- `http://localhost:4200` - Qopnet Admin UI
- `http://localhost:3000` - Qopnet Commerce
- `http://localhost:` - Qopnet Concierge
- `http://localhost:` - Qopnet POS

## Workflow

### General

1. Start development with `git flow feature start issue-name`.
2. Sync the branch with `git push origin feature/issue-name`.
3. Create pull request (PR).
4. PR will be reviewed and merged to `develop` as staging.
5. `develop` will be reviewed and released to `main` as production.

### Backend

1. API documentation with Postman API collections.
2. Implement API endpoints.

### Frontend

1. UI/UX with Figma.
2. Implement pages and components with Chakra UI.

## Setup environment variables

Use Doppler to easily manage the environment variables. They were declared in `.env` (copied from `.env.example`), but not anymore, although you can still use it.

### Doppler

Setup your account.

```sh
doppler login
doppler setup
```

Run `doppler` to fetch the env variables and use it along with npm.

```sh
doppler run -- npm run <command>
doppler run -- npm run many
```

### Prisma

- See the documentation for more detail: https://pris.ly/d/prisma-schema#using-environment-variables
- Prisma supports the native connection string format for PostgreSQL, MySQL, SQL Server and SQLite.
- See the documentation for all the connection string options: https://pris.ly/d/connection-strings
- https://dev.to/prisma/set-up-a-free-postgresql-database-on-supabase-to-use-with-prisma-3pk6
- https://www.prisma.io/blog/full-stack-typesafety-with-angular-nest-nx-and-prisma-CcMK7fbQfTWc

## Nx workspace

### Adding capabilities to your workspace

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

### Generate an application

Run `nx g @nrwl/react:app my-app` to generate an application.

> You can use any of the plugins above to generate applications as well.

When using Nx, you can create multiple applications and libraries in the same workspace.

### Generate a library

Run `nx g @nrwl/react:lib my-lib` to generate a library.

> You can also use any of the plugins above to generate libraries as well.

Libraries are shareable across libraries and applications. They can be imported from `@qopnet/mylib`.

### Development server

Run `nx serve my-app` for a dev server. Navigate to http://localhost:4200/. The app will automatically reload if you change any of the source files.

### Code scaffolding

Run `nx g @nrwl/react:component my-component --project=my-app` to generate a new component.

### Build

Run `nx build my-app` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

### Running unit tests

Run `nx test my-app` to execute the unit tests via [Jest](https://jestjs.io).

Run `nx affected:test` to execute the unit tests affected by a change.

### Running end-to-end tests

Run `ng e2e my-app` to execute the end-to-end tests via [Cypress](https://www.cypress.io).

Run `nx affected:e2e` to execute the end-to-end tests affected by a change.

### Understand your workspace

Run `nx dep-graph` to see a diagram of the dependencies of your projects.

### Further help

Visit the [Nx Documentation](https://nx.dev) to learn more.
