-- This trigger can be pasted into the first init migration
-- Copy from auth.users to public.users
CREATE OR REPLACE FUNCTION public.signup_copy_to_users_table() RETURNS TRIGGER AS $$ BEGIN
INSERT INTO public.users (id, email)
VALUES(new.id, new.email);
RETURN NEW;
INSERT INTO public.profiles (userId)
VALUES(new.userId);
RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;