var db = require("../lib/example-db");
var logger = require("../lib/logger");
var Connection = require("../model/Connection");
var webSocketServer = require("../lib/webSocketServer");
var knex = require("knex");
var Bluebird = require("bluebird");
var app;
process.nextTick(function() {
    app = require("../app");
});

exports.getConsole = function(req, res, next) {
    res.render("console/demoConsole");
};

exports.postConsole = function(req, res, next) {
    var query = req.body.query;

    if (query) {
        db.query(query, [], function(error, result) {
            logger.debug(result);
            res.render("console/demoConsole", {
                error: error,
                query: query,
                result: result
            });
        });
    }
};

exports.getConnectionConsole = function(req, res, next) {
    var user = req.session.user;
    var connectionId = req.params.connectionId;

    Connection.forge({
        connectionId: connectionId,
        ownerId: user.userId,
        inactiveDate: null
    }).fetch({
        required: true
    }).then(function(connection) {
        res.render("console/console", {
            connection: connection.toJSON(),
            async: true
        });
    }).catch(function(error) {
        next(error);
    });
};

// SOCKETS

webSocketServer.on("connection", function connection(ws) {
    logger.debug("webSocketServer received a connection");
    // TODO: authenticate user
    var socketController = new SocketController(ws);
});

function SocketController(ws) {
    var self = this;
    this.ws = ws;

    ws.on("message", function incoming(message) {
        self.route(message);
    });

    ws.on("close", function incoming(message) {
        self.route(message);
    });
}

SocketController.prototype = {
    route: function(message) {
        if (!message || typeof message !== "string") {
            return;
        }
        // TODO: use JSON format
        var split = message.split("\n", 2);
        var route = split[0];
        var body = split[1];
        var promise;
        switch (route) {
            case "connect":
                promise = this.handleConnect(body);
                break;
            case "query":
                promise = this.handleQuery(body);
                break;
            case "close":
                promise = this.cleanup(body);
        }
    },

    handleConnect: function(connectionId) {
        var self = this;

        this.cleanup();

        return Connection.forge({
            connectionId: connectionId,
            inactiveDate: null
        }).fetch().then(function(connection) {
            var cn = connection.toJSON();
            self.knex = connection.getClient();
        }).then(function() {
            self.ws.send("connect");
        }).catch(function(error) {
            self.ws.send("error\n" + JSON.stringify(error));
        });
    },

    handleQuery: function(queryText) {
        var self = this;
        // TODO: sanitize input
        return this.knex.raw(queryText, [])
            .options({ rowMode: "array" })
            .then(function(result) {
                self.ws.send("results\n" + JSON.stringify(result));
                app.render("console/partial/resultsTable", { result: result }, function(error, html) {
                    if (error) throw error;
                    self.ws.send("resultsHtml\n" + html);
                });
        }).catch(function(error) {
            logger.error(error);
            self.ws.send("error\n" + JSON.stringify(error));
        });
    },

    cleanup: function() {
        var promise;
        if (this.knex) {
            promise = knex.destroy();
            delete this.knex;
        } else {
            promise = Bluebird.resolve();
        }

        return promise;
    }
};
