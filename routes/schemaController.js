var Connection = require("../model/Connection");

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
        return [connection, connection.getSchema()];
    }).spread(function(connection, schema) {
        res.render("schema/schema", {
            connection: connection.toJSON(),
            schema: schema
        });
    }).catch(function(error) {
        next(error);
    });
};
