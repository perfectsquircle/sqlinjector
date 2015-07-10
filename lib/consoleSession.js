var logger = require("./logger");
var config = require("../config");

var LRU = require("lru-cache");
var consoleSessions = new LRU({
    max: config.maxSessions,
    maxAge: config.consoleSessionTimeout,
    dispose: function closeSession(key, session) {
        logger.debug("Closing session ", session.consoleSessionKey);
        session.close();
    }

});

var ConsoleSession = function(consoleSessionKey, connection, user) {
    this.consoleSessionKey = consoleSessionKey;
    this.connection = connection;
    this.client = connection.getClient();
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
        }

        return session;
    }
};
