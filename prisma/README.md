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

The `.env` used is in the root. The `DATABASE_URL` should use PostgreSQL string from Qopnet Development.

```
DATABASE_URL=postgres://postgres:developmentPassword@db.development.supabase.co:5432/postgres
```

## Run Migrate

Run the SQL migration files.

```sh
npm run prisma:migrate
```

## Run Generate

Generate Prisma Schema to be used in the app.

```sh
npm run prisma:generate
```

## Run Studio

Preview database with GUI.

```sh
npm run prisma:studio
```
