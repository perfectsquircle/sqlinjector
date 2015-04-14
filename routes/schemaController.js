var Connection = require("../model/Connection");
var consoleSession = require("../lib/consoleSession");

exports.getConnectionSchema = function(req, res, next) {
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
        return [session, connection, session.getSchema()];
    }).spread(function(session, connection, schema) {
        res.render("schema/schema", {
            consoleSessionKey: session.consoleSessionKey,
            connection: connection.toJSON(),
            schemata: schema,
            pageTitle: connection.getTitle()
        });
    }).catch(function(error) {
        next(error);
    });
};

exports.getRelationInformation = function(req, res, next) {
    var user = req.session.user;
    var consoleSessionKey = req.params.consoleSessionKey;
    var session = consoleSession.getSession(consoleSessionKey);
    if (!session) {
        return next("No such console session");
    }

    var schema = req.query.schema;
    var relation = req.query.relation;

    session.getRelationInformation(schema, relation).then(function(info) {
        res.render("schema/partial/relation", {
            title: info.schema + "." + info.relation,
            result: info.result
        });
    }).catch(function(e) {
        res.send(e.message);
    });
};
