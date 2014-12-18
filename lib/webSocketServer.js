var WebSocketServer = require("ws").Server;
var webSocketServer = new WebSocketServer({ port: 3002, path: "/console" });

module.exports = webSocketServer;