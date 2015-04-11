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
        var consoleSession = consoleSessionController.createSession(connection, user);
        res.render("console/console", {
            connection: connection.toJSON(),
            consoleSessionKey: consoleSession.consoleSessionKey,
            pageTitle: connection.getTitle()
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
        res.render("console/partial/resultsTable", {
            result: result
        });
    }).catch(function(e) {
        res.send(e.message);
    });
};
