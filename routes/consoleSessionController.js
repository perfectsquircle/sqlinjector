var crypto = require("crypto");
var config = require("../config");
var ConsoleSession = require("../lib/ConsoleSession");
var logger = require("../lib/logger");
var consoleSessions = require("memory-cache");

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

        return key;
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
        logger.debug("Closing session ", session)
        session.close();
    }
}