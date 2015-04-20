with x as (
select
  a.attname as name
  , pg_catalog.format_type(a.atttypid, a.atttypmod) AS type
  , a.attnotnull AS notnull
  , (select
      array_agg(con.contype)
     from pg_constraint con
     where c.oid = con.conrelid
     and a.attnum = ANY (con.conkey)
    ) as constraints
from pg_namespace n
  join pg_class c on n.oid = c.relnamespace
  join pg_attribute a on c.oid = a.attrelid
where a.attnum > 0
  and n.nspname = $1
  and c.relname = $2
order by a.attnum
)
select
  *
  , constraints @> array['p'::"char"] as primarykey
  , constraints @> array['f'::"char"] as foreignkey
  , constraints @> array['u'::"char"] as uniquekey
from x
;
