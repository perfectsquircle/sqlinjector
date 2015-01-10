select
  nspname as schema,
  relname as relation,
  relkind
from pg_class pc
  join pg_namespace pn on pc.relnamespace = pn.oid
where not (pn.nspname like 'pg_%' OR pn.nspname='information_schema')
--and relkind in ('r','v')
order by schema, relkind, relation
;