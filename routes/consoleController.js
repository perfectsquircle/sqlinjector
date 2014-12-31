var db = require("../lib/example-db");
var logger = require("../lib/logger");
var Connection = require("../model/Connection");
var knex = require("knex");
var Bluebird = require("bluebird");
var consoleSessionController = require("./consoleSessionController");

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
        var consoleSessionKey = consoleSessionController.createSession(connection, user);
        res.render("console/console", {
            connection: connection.toJSON(),
            consoleSessionKey: consoleSessionKey,
            async: false
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
        // res.json({
        //     rows: result.rows
        // });
        res.render("console/partial/resultsTable", {
            result: result
        });
    }).catch(next);
};
