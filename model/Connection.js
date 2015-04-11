var bookshelf = require("./bookshelf");
var schema = require("../lib/database/schema");
var DatabaseClient = require("../lib/database/DatabaseClient");
var util = require("util");

var Connection = bookshelf.Model.extend({
    tableName: "connection",
    idAttribute: "connectionId",

    getTitle: function() {
        return util.format("%s@%s/%s",
            this.get("username"),
            this.get("hostname"),
            this.get("database")
        );
    },

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
    }
});

module.exports = Connection;
