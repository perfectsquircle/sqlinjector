var logger = require("../lib/logger");
var Connection = require("../model/Connection");
var consoleSession = require("../lib/consoleSession");

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
        var session = consoleSession.createSession(connection, user);
        res.render("console/console", {
            connection: connection.toJSON(),
            consoleSessionKey: session.consoleSessionKey,
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
    var session = consoleSession.getSession(consoleSessionKey);
    if (!session) {
        return next("No such console session");
    }

    session.handleQuery(req.body.queryText, req.body.queryParams).then(function(result) {
        res.render("console/partial/resultsTable", {
            result: result
        });
    }).catch(function(e) {
        res.send(e.message);
    });
};
