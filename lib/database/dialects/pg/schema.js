var _ = require("lodash");
var fs = require("fs");
var path = require("path");

var getAllRelations = fs.readFileSync(path.join(__dirname, "getAllRelations.sql"), "utf-8");

var getAllDatabases = "select * from pg_database where datistemplate = false;";

exports.getAllRelations = function(client) {
    return client.raw(getAllRelations, [], {
        rowMode: "normal",
        rowLimit: 10000
    }).then(function(result) {
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

exports.getAllDatabases = function(client) {

};
