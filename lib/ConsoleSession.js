var WebSocket = require("ws");
var logger = require("./logger");
var app;
process.nextTick(function() {
    app = require("../app");
});

var ConsoleSession = module.exports = function(consoleSessionKey, connection, user) {
    this.consoleSessionKey = consoleSessionKey;
    this.connection = connection;
    this.knex = connection.getClient();
    this.user = user;
};

ConsoleSession.generateKey = function() {
    var key = crypto.randomBytes(32).toString("hex");

    consoleSessions[key] = new ConsoleSession(key, connection, user);

    setTimeout(function() {
        if (!consoleSessions[key].established()) {
            delete consoleSessions[key];
        }
    }, config.connectionKeyTimeout);

    return key;
};

ConsoleSession.prototype = {
    init: function(ws) {
        var self = this;
        this.ws = ws;

        ws.on("message", function incoming(message) {
            console.log("received ws message: ", message);
            self.route(message);
        });

        ws.on("close", function incoming(message) {
            self.route(message);
        });

        ws.send(JSON.stringify({
            action: "establish"
        }));
    },

    route: function(message) {
        var self = this;
        if (!message || typeof message !== "string") {
            return;
        }
        var messageObj = JSON.parse(message);
        var action = messageObj.action;
        var params = messageObj.params;
        var body = messageObj.body;
        var promise;
        switch (action) {
            case "query":
                promise = this.handleQuery(params, body);
                break;
            case "close":
                promise = this.close();
                break;
        }
        promise.error(function(error) {
            logger.error(error);
            // self.ws.send(JSON.stringify({
            //     action: "error",
            //     body: error
            // }));
        });
    },

    handleQuery: function(params, queryText) {
        var self = this;
        // TODO: sanitize input
        return this.knex.raw(queryText, [])
            .options({
                rowMode: "array"
            })
            .then(function(result) {
                //return result;
                app.render("console/partial/resultsTable", {
                    result: result
                }, function(error, html) {
                    if (error) throw error;
                    self.ws.send(JSON.stringify({
                        action: "resultsHtml",
                        body: html
                    }));
                });
            });
    },

    close: function() {
        var promise;
        if (this.knex) {
            promise = knex.destroy();
            delete this.knex;
        } else {
            promise = Bluebird.resolve();
        }

        delete this.ws;

        return promise;
    },

    isEstablished: function() {
        return this.ws instanceof WebSocket;
    }
};
