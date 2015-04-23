select
  pg_get_userbyid(pp.proowner) as owner
from pg_proc pp
  join pg_namespace pn on pp.pronamespace = pn.oid
where
  pn.nspname = $1
  and pp.proname = $2
;
