alter table storage.objects drop constraint objects_owner_fkey,
  add constraint objects_owner_fkey foreign key (owner) references auth.users(id) on delete
set null;