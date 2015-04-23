select
  nspname as schema,
  relname as relation,
  relkind as kind
from pg_class pc
  join pg_namespace pn on pc.relnamespace = pn.oid
--where not (pn.nspname like 'pg_%' OR pn.nspname='information_schema')
--  and relkind in ('r','v')

union all

select
  nspname as schema,
  proname as relation,
  'function' as kind
from pg_proc pp
  join pg_namespace pn on pp.pronamespace = pn.oid
--where not (pn.nspname like 'pg_%' OR pn.nspname='information_schema')
--  and relkind in ('r','v')

order by schema, kind, relation
;
