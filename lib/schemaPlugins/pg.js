var _ = require("underscore");

var getAllRelations = "select " +
    "  nspname as schema, " +
    "  relname as relation, " +
    "  relkind " +
    "from pg_class pc " +
    "  join pg_namespace pn on pc.relnamespace = pn.oid " +
    "where nspname not in ('information_schema', 'pg_catalog') " +
    "--  and relkind in ('r','v') " +
    "order by schema, relkind, relation;";

exports.getAllRelations = function(client) {
    return client.raw(getAllRelations).then(function(result) {
        var schemas = [];
        _.each(result.rows, function(row) {
            var schema = _.findWhere(schemas, {
                name: row.schema
            });
            if (!schema) {
                schema = {
                    name: row.schema,
                    tables: [],
                    views: [],
                    indexes: [],
                    sequences: [],
                    other: []
                };
                schemas.push(schema);
            }

            var x = {
                name: row.relation,
                kind: row.relkind
            };

            switch (row.relkind) {
                case "r":
                    schema.tables.push(x);
                    break;
                case "v":
                    schema.views.push(x);
                    break;
                case "S":
                    schema.sequences.push(x);
                    break;
                case "i":
                    schema.indexes.push(x);
                    break;
                default:
                    schema.other.push(x);
            }
        });
        return schemas;
    });
};
