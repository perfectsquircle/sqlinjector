var Connection = require("../model/Connection");
var consoleSessionController = require("../lib/consoleSession/consoleSessionController");

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
        var consoleSession = consoleSessionController.createSession(connection, user);
        return [consoleSession, connection, consoleSession.getSchema()];
    }).spread(function(consoleSession, connection, schema) {
        res.render("schema/schema", {
            consoleSessionKey: consoleSession.consoleSessionKey,
            connection: connection.toJSON(),
            schema: schema,
            pageTitle: connection.getTitle()
        });
    }).catch(function(error) {
        next(error);
    });
};
