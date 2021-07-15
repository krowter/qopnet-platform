-- Only run this directly via Supabase or PostgreSQL
-- Because Prisma cannot access auth.users
-- Create trigger to run the function whenever a new signup happens
DROP TRIGGER IF EXISTS signup_copy on auth.users;
CREATE TRIGGER signup_copy
AFTER
INSERT ON auth.users FOR EACH ROW EXECUTE PROCEDURE signup_copy_to_users_table();