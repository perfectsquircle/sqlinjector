var crypto = require("crypto");
var config = require("../config");
var ConsoleSession = require("../lib/ConsoleSession");
var logger = require("../lib/logger");

var consoleSessions = {};

module.exports = {
    createSession: function(connection, user) {
        var key = crypto.randomBytes(32).toString("hex");

        consoleSessions[key] = new ConsoleSession(key, connection, user);

        // TODO: cleanup keys use node-cache

        return key;
    },
    getSession: function(key) {
        return consoleSessions[key];
    }
};
