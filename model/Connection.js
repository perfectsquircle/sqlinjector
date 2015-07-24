var bookshelf = require("./bookshelf");
var DatabaseClient = require("../lib/database/DatabaseClient");
var util = require("util");
var hashids = require("../lib/hashids");
var _ = require("lodash");
var logger = require("../lib/logger");
var slug = require("../lib/slug");
var Bluebird = require("bluebird");

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
        attributes.connectionId = hashids.encode(attributes.connectionId);
        attributes.urlTitle = slug(attributes.title);
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
    },

    getConnections: function(userId) {

        return this.query({
            where: {
                inactiveDate: null,
                ownerId: userId
            },
            orderBy: "position"
        }).fetchAll();
    },

    sort: function(connectionIds, userId) {
        var self = this;
        return this.getConnections(userId).then(function(connections) {
            return Bluebird.all(connections.map(function(connection) {
                logger.silly(connection.id, connectionIds.indexOf(connection.id));
                var position = connectionIds.indexOf(connection.id);
                var qb = self.query();
                return qb.where({
                    connectionId: hashids.decode(connection.id)[0]
                }).update({
                    position: position
                });
            }));
        });
    }
});

module.exports = Connection;
