var bookshelf = require("./bookshelf");
var DatabaseClient = require("../lib/database/DatabaseClient");
var util = require("util");

function getTitle(attributes) {
    if (attributes.name) {
        return attributes.name;
    } else {
        return util.format("%s@%s/%s",
            attributes.username,
            attributes.hostname,
            attributes.database
        );
    }
}

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

    parse: function(attributes) {
        attributes.title = getTitle(attributes);
        return attributes;
    }
}, {

    getConnection: function(connectionId, userId) {
        return this.forge({
            connectionId: connectionId,
            ownerId: userId,
            inactiveDate: null
        }).fetch().then(function(connection) {
            if (!connection) {
                throw new Error("No such connection");
            }
            return connection;
        });
    }
});

module.exports = Connection;
