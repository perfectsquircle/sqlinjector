var _ = require("lodash");
var fs = require("fs");
var path = require("path");

var getAllRelations = fs.readFileSync(path.join(__dirname, "queries", "getAllRelations.sql"), "utf-8");
var getAllDatabases = "select * from pg_database where datistemplate = false;";

function getRelationKind(char) {
    switch (char) {
        case "r":
            return "table";
        case "v":
            return "view";
        case "f":
            return "function";
        case "S":
            return "sequence";
        case "i":
            return "index";
        default:
            return "other";
    }
}

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
                    functions: [],
                    other: []
                };
                schemas.push(schema);
            }

            var kind = getRelationKind(row.kind);

            var x = {
                name: row.relation,
                kind: kind
            };

            switch (row.kind) {
                case "r":
                    schema.tables.push(x);
                    break;
                case "v":
                    schema.views.push(x);
                    break;
                case "f":
                    schema.functions.push(x);
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
