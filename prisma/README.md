# Prisma

## Prisma Workflow

1. Update Prisma schema
2. Run `migrate`
3. Run `push`
4. Run `generate`

## Preparation

Since we're using Supabase for authentication/authorization, there is a special `auth.users` table for Supabase Auth. The schema is in `auth`, not `public`. Meanwhile, Prisma uses `public` table by default and cannot access or cross reference the `auth` schema.

Therefore this is how we organize them:

1. Prisma Schema contains model of `User`, `Profile`, `AdminProfile`.
2. As declared in `copy-users.sql` it has a PostgreSQL function and trigger to copy newly signed up user to `public.users` table. So it copy `auth.users` `id` to `public.users` `id`.
3. `Profile` and `AdminProfile` can reference the `userId` to `public.users` id. Which can also be used to track back into `auth.users`.

Basically, after we migrate Prisma Schema into SQL migration files, we have to make sure the data type and reference are set correctly. Because currently Prisma currently doesn't support cross reference/schema foreign key.

## Setup Environment

Use Doppler to manage environment variables on `development`, `staging`, and `production` as mentioned in the project [README](../README.md). The `DATABASE_URL` should use PostgreSQL string from Qopnet Development when you're developing locally.

Optionally, you can still use `.env` file without Doppler although you need to keep up to date with the variables.

```
DATABASE_URL=postgres://postgres:developmentPassword@db.development.supabase.co:5432/postgres
```

## Run Generate

Generate Prisma Schema to be used in the app. Only used once.

```sh
doppler run -- npm run prisma:generate
```

## Run Migrate

Create the SQL migration files.

```sh
doppler run -- npm run prisma:migrate
```

## Run Push

Run and push the SQL migration files to the database.

```sh
doppler run -- npm run prisma:push
```

## Run Studio

Preview database with GUI.

```sh
doppler run -- npm run prisma:studio
```

## Run Format

Check the Prisma Schema formatting.

```sh
doppler run -- npm run prisma:format
```
