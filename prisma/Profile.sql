-- Update this table field on init
CREATE TABLE "Profile" (
  "id" uuid REFERENCES auth.users NOT NULL,
  "handle" CITEXT NOT NULL,
);