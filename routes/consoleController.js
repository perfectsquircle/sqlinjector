var util = require("util");
var logger = require("../lib/logger");
var Connection = require("../model/Connection");
var consoleSessionController = require("../lib/consoleSession/consoleSessionController");

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
        var consoleSessionKey = consoleSessionController.createSession(connection, user);
        res.render("console/console", {
            connection: connection.toJSON(),
            consoleSessionKey: consoleSessionKey,
            pageTitle: util.format("%s@%s/%s", connection.get("username"), connection.get("hostname"), connection.get("database"))
        });
    }).catch(function(error) {
        next(error);
    });
};

exports.postConsoleSessionQuery = function(req, res, next) {
    if (!req.body) {
        return next("Malformed request");
    }
    var consoleSessionKey = req.params.consoleSessionKey;
    var consoleSession = consoleSessionController.getSession(consoleSessionKey);
    if (!consoleSession) {
        return next("No such console session");
    }

    consoleSession.handleQuery(req.body.queryText, req.body.queryParams).then(function(result) {
        if (result && result.rows) {
            if (result.rows.length > 10000) {
                result.rows.splice(10000, Infinity); // TODO: limit this earlier
            }
        }
        return result;
    }).then(function(result) {
        res.render("console/partial/resultsTable", {
            result: result
        });
    }).catch(function(e) {
        res.send(e.message);
    });
};
