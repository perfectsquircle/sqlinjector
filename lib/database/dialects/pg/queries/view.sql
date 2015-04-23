select
  pg_get_viewdef(pc.oid, true) as definition
from pg_class pc
  join pg_namespace pn on pc.relnamespace = pn.oid
where pn.nspname = $1
  and pc.relname = $2
;
