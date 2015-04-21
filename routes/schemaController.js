var Connection = require("../model/Connection");
var consoleSession = require("../lib/consoleSession");

exports.getConnectionSchema = function(req, res, next) {
    var user = req.session.user;
    var connectionId = req.params.connectionId;

    Connection.getConnection(connectionId, user.userId).then(function(connection) {
        var session = consoleSession.getSession(connection, user);
        return [session, connection, session.getSchema()];
    }).spread(function(session, connection, schema) {
        res.render("schema/schema", {
            connection: connection.toJSON(),
            schemata: schema,
            pageTitle: connection.getTitle(),
            databaseName: connection.get("database")
        });
    }).catch(function(error) {
        next(error);
    });
};

exports.getRelationInformation = function(req, res, next) {
    var user = req.session.user;
    var connectionId = req.params.connectionId;

    var schema = req.query.schema;
    var relation = req.query.relation;
    var kind = req.query.kind || "table";

    Connection.getConnection(connectionId, user.userId).then(function(connection) {
        var session = consoleSession.getSession(connection, user);
        return session.getRelationInformation(schema, relation);
    }).then(function(info) {
        res.render("schema/partial/relation", {
            title: info.schema + "." + info.relation,
            sample: info.sample,
            count: info.count,
            columns: info.columns,
            owner: info.owner,
            tablespace: info.tablespace
        });
    }).catch(function(e) {
        res.send(e.message);
    });
};
