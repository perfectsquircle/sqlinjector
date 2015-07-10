var Connection = require("../model/Connection");
var assert = require("assert");
var logger = require("../lib/logger");
var hashids = require("../lib/hashids");

exports.getConnections = function(req, res, next) {
    var user = req.session.user;

    Connection.getConnections(user.userId).then(function(connections) {
        res.render("connection/connections", {
            connections: connections.toJSON()
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
        res.render("connection/edit", {
            connection: connection.toJSON()
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
        database: b.database,
        username: b.username,
        password: b.password,
        ownerId: userId
    };
    if (b.connectionId) {
        attributes.connectionId = hashids.decode(b.connectionId)[0];
    }

    return Connection.forge(attributes).save();
}

exports.editConnectionDelete = function(req, res, next) {
    var connectionId = req.params.connectionId;
    var userId = req.session.user.userId;

    Connection.forge({
        connectionId: connectionId
    }).fetch().then(function(connection) {
        if (connection.get("ownerId") === userId) {
            connection.set("connectionId", connectionId);
            return connection.destroy();
        }
    }).then(function() {
        if (req.xhr) {
            res.json({
                success: true
            });
        } else {
            res.redirect("/");
        }
    }).catch(next);
};

exports.connectionMiddleware = function(req, res, next) {
    if (req.params && req.params.connectionId) {
        req.params.encodedConnectionId = req.params.connectionId;
        req.params.connectionId = hashids.decode(req.params.connectionId)[0];
        logger.debug("Decoding hashid", req.params.encodedConnectionId, "=>", req.params.connectionId);
    }
    return next();
};
