var schemaPlugins = require("./schemaPlugins");


exports.getSchemaFromConnection = function(connection) {
    var schemaPlugin = schemaPlugins[connection.get("databaseType")];
    if (!schemaPlugin) {
        throw new Error("Schema not supported for this connection type");
    }
    return schemaPlugin.getAllRelations(connection.getClient());
};
