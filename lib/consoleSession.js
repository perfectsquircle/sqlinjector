var logger = require("./logger");
var config = require("../config");
var DatabaseClient = require("../lib/database/DatabaseClient");
var NodeCache = require("node-cache");

var consoleSessions = new NodeCache({
    stdTTL: config.consoleSessionTimeout,
    useClones: false
});

consoleSessions.on("del", function(key, session) {
    logger.debug("Closing session ", session.consoleSessionKey);
    session.close();
});

function cleanup(signal) {
    logger.debug("Received a signal:", signal);
    consoleSessions.del(consoleSessions.keys());
    process.exit();
}

process.once("SIGINT", cleanup.bind(null, "SIGINT"));
process.once("SIGTERM", cleanup.bind(null, "SIGTERM"));
process.once("SIGHUP", cleanup.bind(null, "SIGHUP"));


function getClient(connection) {
    return DatabaseClient.createFromType(
        connection.databaseType, {}, {
            host: connection.hostname,
            port: connection.port,
            database: connection.database,
            user: connection.username,
            password: connection.password
        });
}

var ConsoleSession = function(consoleSessionKey, connection, user) {
    this.consoleSessionKey = consoleSessionKey;
    this.connection = connection;
    this.client = getClient(connection);
    this.user = user;
};

ConsoleSession.prototype = {
    handleQuery: function(queryText, params, options) {
        var self = this;
        // TODO: sanitize input
        return this.client.raw(queryText, params, options);
    },

    getSchema: function() {
        return this.client.getSchema();
    },

    getRelationInformation: function(schema, relation, kind) {
        return this.client.getRelationInformation(schema, relation, kind);
    },

    close: function() {
        this.client.close();
    }
};

module.exports = {
    getSession: function(connection, user) {
        var key = JSON.stringify({
            connection: connection,
            user: user.userId
        });

        var session = consoleSessions.get(key);
        if (!session) {
            logger.debug("Creating session with key ", key);
            session = new ConsoleSession(key, connection, user);
            consoleSessions.set(
                key,
                session
            );
        } else {
            consoleSessions.ttl(key);
        }

        return session;
    }
};
