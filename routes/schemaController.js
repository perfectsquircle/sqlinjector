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
        return [consoleSession, connection, session.getSchema()];
    }).spread(function(session, connection, schema) {
        res.render("schema/schema", {
            consoleSessionKey: session.consoleSessionKey,
            connection: connection.toJSON(),
            schema: schema,
            pageTitle: connection.getTitle()
        });
    }).catch(function(error) {
        next(error);
    });
};
