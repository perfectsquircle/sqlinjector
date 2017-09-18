var Connection = require("../model/Connection");
var assert = require("assert");
var logger = require("../lib/logger");
var _ = require("lodash");

exports.getConnections = function(req, res, next) {
    var user = req.session.user;

    Connection.getConnections(user.userId).then(function(connections) {
        res.render("connection/connections", {
            connections: connections
        });
    }).catch(next);
};

exports.sortConnectionsPost = function(req, res, next) {
    var user = req.session.user;
    var connectionIds = req.body;
    assert(connectionIds && connectionIds.length, "Malformed POST body");

    Connection.sort(connectionIds, user.userId).then(function() {
        res.json({
            success: true
        });
    }).catch(next);
};

exports.createConnection = function(req, res, next) {
    res.render("connection/edit", {
        connection: {}
    });
};

exports.createConnectionPost = function(req, res, next) {
    var user = req.session.user;

    saveConnection(user.userId, req.body).then(function(model) {
        res.redirect("/");
    });
};

exports.editConnection = function(req, res, next) {
    var user = req.session.user;
    Connection.getConnection(req.params.connectionId, user.userId).then(function(connection) {
        if (!connection) {
            return next();
        }
        res.render("connection/edit", {
            connection: connection
        });
    }).catch(next);
};

exports.editConnectionPost = function(req, res, next) {
    var user = req.session.user;

    saveConnection(user.userId, req.body).then(function(model) {
        res.redirect("/");
    });
};

function saveConnection(userId, reqBody) {
    var b = reqBody;
    logger.debug(b);
    assert(b && b.databaseType && b.hostname && b.database && b.username && b.password, "Malformed POST body");

    var attributes = {
        name: b.name,
        color: b.color,
        databaseType: b.databaseType,
        hostname: b.hostname,
        port: b.port,
        database: b.database,
        username: b.username,
        password: b.password,
        ownerId: userId
    };
    if (b.connectionId) {
        attributes._id = b.connectionId;
        return Connection.update(attributes);
    } else {
        return Connection.create(attributes);
    }
}

exports.editConnectionDelete = function(req, res, next) {
    var connectionId = req.params.connectionId;
    var userId = req.session.user.userId;

    Connection.delete(connectionId, userId).then(function() {
        if (req.xhr) {
            res.json({
                success: true
            });
        } else {
            res.redirect("/");
        }
    }).catch(next);
};
