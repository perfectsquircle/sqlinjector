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

    connection = _.extend({
        host: "localhost"
    }, connection);

    this.client = Bluebird.promisifyAll(new pg.Client(connection));
};

util.inherits(PostgresDatabaseClient, DatabaseClient);
var p = PostgresDatabaseClient.prototype;

p.raw = function(statement, params, options) {
    if (!options) {
        options = {};
    }
    var client = this.client;
    var rowLimit = options.rowLimit || this.options.rowLimit;

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
                    req.removeAllListeners("row");
                    req.removeAllListeners("end");
                    resolve(result);
                }
            });

            req.on("error", function(error) {
                // Todo: parse errors
                reject(error);
            });

            req.on("end", function(result) {
                resolve(result);
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
    return this.client.readyForQuery ? Bluebird.resolve() : this.client.connectAsync();
};

p.getSchema = function() {
    return schema.getAllRelations(this);
};

p.getRelationInformation = function(schemaName, relationName, kind) {
    return relation.getInformation(this, schemaName, relationName, kind);
};
