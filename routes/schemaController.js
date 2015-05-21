var Connection = require("../model/Connection");
var consoleSession = require("../lib/consoleSession");
var _ = require("lodash");

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
            pageTitle: connection.get("title"),
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
    var kind = req.query.kind;

    Connection.getConnection(connectionId, user.userId).then(function(connection) {
        var session = consoleSession.getSession(connection, user);
        return session.getRelationInformation(schema, relation, kind);
    }).then(function(info) {
        var options = {
            title: schema + "." + relation,
            owner: info.owner,
            tablespace: info.tablespace
        };

        switch (kind) {
            case "table":
                res.render("schema/partial/table", _.extend({
                    sample: info.sample,
                    count: info.count,
                    columns: info.columns
                }, options));
                break;
            case "view":
                res.render("schema/partial/view", _.extend({
                    sample: info.sample,
                    count: info.count,
                    definition: info.definition
                }, options));
                break;
            case "function":
                res.render("schema/partial/function", _.extend({
                    definition: info.definition
                }, options));
                break;
            default:
                res.render("schema/partial/relation", options);
        }
    }).catch(next);
};
