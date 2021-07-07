# Prisma

## Preparation

Since we're using Supabase, there is a special `auth.users` table for Supabase Auth. The schema is in `auth`, not `public`. Meanwhile, Prisma uses `public` table by default and cannot access `auth` PostgreSQL schema.

Therefore the initial migration file should consist of this special SQL command:

```sql
CREATE TABLE "Profile" (
    "id" uuid REFERENCES auth.users NOT NULL,
    "handle" CITEXT NOT NULL,
    -- ...
);
```

Basically, after we migrate Prisma Schema into SQL migration files, we have to make sure the data type and reference are set correctly. Because currently Prisma doesn't support cross reference/schema foreign key.

## Setup Environment

Use Doppler to manage environment variables on `development`, `staging`, and `production` as mentioned in the project [README](../README.md). The `DATABASE_URL` should use PostgreSQL string from Qopnet Development when you're developing locally.

Optionally, you can still use `.env` file without Doppler although you need to keep up to date with the variables.

```
DATABASE_URL=postgres://postgres:developmentPassword@db.development.supabase.co:5432/postgres
```

## Run Migrate

Run the SQL migration files.

```sh
doppler run -- npm run prisma:migrate
```

## Run Generate

Generate Prisma Schema to be used in the app.

```sh
doppler run -- npm run prisma:generate
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
