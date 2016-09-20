var util = require("util");
var DatabaseClient = require("../../DatabaseClient");
var sql = require("mssql");
var _ = require("lodash");
var Bluebird = require("bluebird");

var MSDatabaseClient = module.exports = function(options, connection) {
    DatabaseClient.call(this, options);

    this.options = options = _.extend({
        rowLimit: 1000
    }, options);

    if (connection.host) {
      connection.server = connection.host
    }

    if (connection.user && connection.user.includes("\\")) {
        var parts = connection.user.split("\\");
        connection.user = parts[1];
        connection.domain = parts[0];
    }

    this.connection = _.extend({
        server: "localhost",
        port: 1433
    }, connection);

    console.dir(connection, this.connection);

    this.resetClient();
};

util.inherits(MSDatabaseClient, DatabaseClient);
var p = MSDatabaseClient.prototype;

p.raw = function(statement, params, options) {
    if (!options) {
        options = {};
    }
    var client = this.client;
    var rowLimit = options.rowLimit || this.options.rowLimit;

    if (/^[\s;]*$/.test(statement)) {
        return Bluebird.reject("Empty statement not allowed");
    }

    return sql.connect(this.connection).then(function() {
      return new sql.Request().query(statement).then(function(recordSet) {
        // console.dir(recordSet);
        return {
          command: "SELECT",
          fields: _.keys(recordSet[0]),
          rows: recordSet,
          rowCount: recordSet.length
        };
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
    return this.client.connect().catch(function(e) {
        // We need to reset the client because it's in a bad state from a failed connection.
        self.resetClient();
        return Bluebird.reject(e);
    });
};

p.resetClient = function() {
    if (this.client) {
        this.client.close();
        delete this.client;
    }

    // this.client = new sql.Connection(this.connection);
};
