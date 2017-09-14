var util = require("util");
var DatabaseClient = require("../../DatabaseClient");
var pg = require("pg");
var _ = require("lodash");
var Bluebird = require("bluebird");
var schema = require("./schema");
var relation = require("./relation");

var PostgresDatabaseClient = module.exports = function(options, connection) {
    DatabaseClient.call(this, options);

    this.options = options = _.extend({
        rowLimit: 1000
    }, options);

    this.connection = _.extend({
        host: "localhost",
        port: 5432
    }, connection);

    this.resetClient();
};

util.inherits(PostgresDatabaseClient, DatabaseClient);
var p = PostgresDatabaseClient.prototype;

p.raw = function(statement, params, options) {
    if (!options) {
        options = {};
    }
    var client = this.client;
    var rowLimit = options.rowLimit || this.options.rowLimit;

    if (/^[\s;]*$/.test(statement)) {
        return Bluebird.reject("Empty statement not allowed");
    }

    return this.connect().then(function() {
        return new Bluebird(function(resolve, reject) {
            var req = client.query(_.extend({
                text: statement,
                values: params,
                rowMode: "array",
                rows: rowLimit
            }, options));

            req.on("row", function rowHandler(row, result) {
                result.addRow(row);
                if (result.rows.length === rowLimit) {
                    req.removeListener("row", rowHandler);
                }
            });

            req.on("error", function(error) {
                // Todo: parse errors
                reject(error);
            });

            req.on("end", function(result) {
                resolve({
                    command: result.command,
                    rowCount: Math.max(result.rowCount, result.rows.length),
                    fields: _.pluck(result.fields, "name"),
                    rows: result.rows
                });
            });
        });
    });
};

p.close = function() {
    if (this.client) {
        this.client.end();
    }
};

p.connect = function() {
    var self = this;
    return this.client.readyForQuery ? Bluebird.resolve() : this.connectAsync().catch(function(e) {
        // We need to reset the client because it's in a bad state from a failed connection.
        self.resetClient();
        return Bluebird.reject(e);
    });
};

p.resetClient = function() {
    if (this.client) {
        this.client.end();
        delete this.client;
    }

    this.client = new pg.Client(this.connection);
    this.connectAsync = Bluebird.promisify(this.client.connect, this.client);
};

p.getSchema = function() {
    return schema.getAllRelations(this);
};

p.getRelationInformation = function(schemaName, relationName, kind) {
    return relation.getInformation(this, schemaName, relationName, kind);
};
