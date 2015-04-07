var bookshelf = require("./bookshelf");
var knex = require("knex");
var schema = require("../lib/database/schema");

var Connection = bookshelf.Model.extend({
    tableName: "connection",
    idAttribute: "connectionId",

    getClient: function() {
        return knex({
            client: this.get("databaseType"),
            connection: {
                host: this.get("hostname"),
                database: this.get("database"),
                user: this.get("username"),
                password: this.get("password")
            }
        });
    },

    getSchema: function() {
        return schema.getSchemaFromConnection(this);
    }
});

module.exports = Connection;
