var logger = require("../lib/logger");
var Connection = require("../model/Connection");
var consoleSession = require("../lib/consoleSession");

exports.getConnectionConsole = function(req, res, next) {
    var user = req.session.user;
    var connectionId = req.params.connectionId;

    Connection.getConnection(connectionId, user.userId).then(function(connection) {
        var session = consoleSession.getSession(connection, user);
        res.render("console/console", {
            connection: connection.toJSON(),
            pageTitle: connection.get("title")
        });
    }).catch(function(error) {
        next(error);
    });
};

exports.postConsoleSessionQuery = function(req, res, next) {
    if (!req.body || !req.body.queryText) {
        return next("Malformed request");
    }

    var user = req.session.user;
    var connectionId = req.params.connectionId;
    Connection.getConnection(connectionId, user.userId).then(function(connection) {
        var session = consoleSession.getSession(connection, user);
        return session.handleQuery(req.body.queryText, req.body.queryParams);
    }).then(function(result) {
        res.format({
            "text/html": function() {
                if (result.command === "SELECT" || (result.rows && result.rows.length)) {
                    res.render("console/partial/resultsTable", {
                        result: result
                    });
                } else {
                    res.render("console/partial/nonSelect", {
                        result: result
                    });
                }
            },
            "application/json": function() {
                res.json(result);
            }
        });
    }).catch(function(e) {
        logger.debug(e);
        res.format({
            "text/html": function() {
                res.send(500, e.message);
            },
            "application/json": function() {
                res.json(500, {
                    message: e.message
                });
            }
        });
    });
};
