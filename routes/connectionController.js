var Connection = require("../model/Connection");
var assert = require("assert");
var logger = require("../lib/logger");

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

exports.createConnection = function(req, res, next) {
    res.render("connection/create", {
        connection: {}
    });
};

exports.createConnectionPost = function(req, res, next) {
    var user = req.session.user;

    saveConnection(user.userId, req.body).then(function(model) {
        res.redirect("/connections");
    });
};

exports.editConnection = function(req, res, next) {
    var user = req.session.user;
    Connection.forge({
        connectionId: req.params.connectionId,
        inactiveDate: null,
        ownerId: user.userId
    }).fetch({
        require: true
    }).then(function(connection) {
        res.render("connection/create", {
            connection: connection.toJSON()
        });
    }).catch(next);
};

exports.editConnectionPost = function(req, res, next) {
    var user = req.session.user;

    saveConnection(user.userId, req.body).then(function(model) {
        res.redirect("/connections");
    });
};

function saveConnection(userId, reqBody) {
    var b = reqBody;
    logger.debug(b);
    assert(b && b.databaseType && b.hostname && b.database && b.username && b.password, "Malformed POST body");

    var attributes = {
        databaseType: b.databaseType,
        hostname: b.hostname,
        database: b.database,
        username: b.username,
        password: b.password,
        ownerId: userId
    };
    if (b.connectionId) {
        attributes.connectionId = b.connectionId;
    }

    return Connection.forge(attributes).save();
}
