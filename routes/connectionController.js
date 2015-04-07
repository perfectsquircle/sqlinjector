var Connection = require("../model/Connection");

exports.getConnections = function(req, res, next) {
    var user = req.session.user;

    Connection.forge({
        inactiveDate: null,
        ownerId: user.userId
    }).fetchAll().then(function(connections) {
        res.render("connection/connections", {
            connections: connections.toJSON()
        });
    }).catch(next);
};
