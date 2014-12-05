select
  nspname as schema,
  relname as relation,
  relkind
from pg_class pc
  join pg_namespace pn on pc.relnamespace = pn.oid
where nspname not in ('information_schema', 'pg_catalog')
--and relkind in ('r','v')
order by schema, relkind, relation
;