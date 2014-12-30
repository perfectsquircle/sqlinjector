var crypto = require("crypto");
var _ = require("underscore");
var config = require("../config");
var ConsoleSession = require("../lib/ConsoleSession");
var WebSocketServer = require("ws").Server;
var logger = require("../lib/logger");
var express = require("express");

var webSocketServer = new WebSocketServer({
    port: config.consoleWebSocketPort,
    path: "/console"
});

webSocketServer.on("connection", function connection(ws) {
    logger.debug("webSocketServer received a connection");

    // express.cookieParser()(ws.upgradeReq, null, function(err) {
    //     var sessionID = ws.upgradeReq.cookies['sid'];
    //     store.get(sessionID, function(err, session) {
    //         // session
    //     });
    // });

    ws.on("message", function(message) {
        if (message in consoleSessions) {
            consoleSessions[message].init(ws);
        }
    });
});

var consoleSessions = {};

module.exports = {
    createSession: function(connection, user) {
        var key = crypto.randomBytes(32).toString("hex");

        consoleSessions[key] = new ConsoleSession(key, connection, user);

        // TODO: cleanup keys
        // setTimeout(function() {
        //     if (!consoleSessions[key].established()) {
        //         delete consoleSessions[key];
        //     }
        // }, config.connectionKeyTimeout);

        return key;
    },
    getSession: function(key) {
        return consoleSessions[key];
    }
};
