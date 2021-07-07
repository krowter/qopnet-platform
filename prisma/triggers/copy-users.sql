CREATE OR REPLACE FUNCTION signup_copy_to_users_table() RETURNS TRIGGER AS $$ BEGIN
INSERT INTO public.users (id, email)
VALUES(new.id, new.email);
RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
DROP TRIGGER IF EXISTS signup_copy on auth.users;
CREATE TRIGGER signup_copy
AFTER
INSERT ON auth.users FOR EACH ROW EXECUTE PROCEDURE signup_copy_to_users_table();