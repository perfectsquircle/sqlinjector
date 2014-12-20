var logger = require("../lib/logger");
var Connection = require("../model/Connection");
var User = require("../model/User");

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
