var logger = require("./logger");
var crypto = require("crypto");
var config = require("../config");

var consoleSessions = require("memory-cache");

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

    getRelationInformation: function(schema, relation) {
        return this.client.getRelationInformation(schema, relation);
    },

    close: function() {
        this.client.close();
    }
};

module.exports = {
    createSession: function(connection, user) {
        var key = crypto.randomBytes(16).toString("hex");

        var session = new ConsoleSession(key, connection, user);
        consoleSessions.put(
            key,
            session,
            config.consoleSessionTimeout,
            closeSession(session)
        );

        return session;
    },
    getSession: function(key) {
        var session = consoleSessions.get(key);
        if (session) {
            consoleSessions.put(
                key,
                session,
                config.consoleSessionTimeout,
                closeSession(session)
            );
        }
        return session;
    }
};


function closeSession(session) {
    return function() {
        logger.debug("Closing session ", session.consoleSessionKey);
        session.close();
    };
}
