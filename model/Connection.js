var bookshelf = require("./bookshelf");
var schema = require("../lib/database/schema");
var DatabaseClient = require("../lib/database/DatabaseClient");

var Connection = bookshelf.Model.extend({
    tableName: "connection",
    idAttribute: "connectionId",

    /**
     * Get a client
     * @returns {DatabaseClient}
     */
    getClient: function() {
        return DatabaseClient.createFromType(
            this.get("databaseType"), {}, {
                host: this.get("hostname"),
                database: this.get("database"),
                user: this.get("username"),
                password: this.get("password")
            });
    },

    getSchema: function() {
        return schema.getSchemaFromConnection(this);
    }
});

module.exports = Connection;
