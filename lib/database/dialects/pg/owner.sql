select
  pg_get_userbyid(pc.relowner) as owner,
  pt.spcname as tablespace
from pg_class pc
  join pg_namespace pn on pc.relnamespace = pn.oid
  left join pg_tablespace pt on pc.reltablespace = pt.oid
where
  pn.nspname = $1
  and pc.relname = $2
;
