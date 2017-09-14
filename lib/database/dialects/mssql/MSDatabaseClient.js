var util = require("util");
var DatabaseClient = require("../../DatabaseClient");
var sql = require("mssql");
var _ = require("lodash");
var Bluebird = require("bluebird");
// var schema = require("./schema");
// var relation = require("./relation");

var MSDatabaseClient = module.exports = function (options, connection) {
    DatabaseClient.call(this, options);

    this.options = options = _.extend({
        rowLimit: 1000
    }, options);

    if (connection.host) {
        connection.server = connection.host;
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

    this.resetClient();
    this.connect();
};

util.inherits(MSDatabaseClient, DatabaseClient);
var p = MSDatabaseClient.prototype;

p.raw = function (statement, params, options) {
    var self = this;
    if (!options) {
        options = {};
    }
    var rowLimit = options.rowLimit || this.options.rowLimit;

    if (/^[\s;]*$/.test(statement)) {
        return Bluebird.reject("Empty statement not allowed");
    }

    var request = new sql.Request(this.client);
    // return this.connect().then(function() {
    return request.query(statement).then(function (recordSet) {
        return {
            command: "SELECT",
            fields: _.keys(recordSet[0]),
            rows: recordSet,
            rowCount: recordSet.length
        };
    });
    // });
};

// p.close = function() {
//     if (this.client) {
//         this.client.end();
//     }
// };

// p.connect = function() {
//     if (!this.client) {
//         this.client = new sql.Connection(this.connection); 
//         return this.client.connect();    
//     }
//     if (this.client.connected) {
//         return Bluebird.resolve();    
//     }
// };

// // p.resetClient = function() {
// //     if (this.client) {
// //         this.client.close();
// //         delete this.client;
// //     }

// //     this.client = new sql.Connection(this.connection);
// // };


p.close = function () {
    if (this.client) {
        this.client.close();
    }
};

p.connect = function () {
    var self = this;
    return (this.client.connected || this.client.connecting) ? Bluebird.resolve() : this.client.connect().catch(function (e) {
        // We need to reset the client because it's in a bad state from a failed connection.
        self.resetClient();
        return Bluebird.reject(e);
    });
};

p.resetClient = function () {
    if (this.client) {
        this.client.close();
        delete this.client;
    }

    this.client = new sql.Connection(this.connection);
};

p.getSchema = function () {
    return schema.getAllRelations(this);
};


p.getRelationInformation = function (schemaName, relationName, kind) {
    return relation.getInformation(this, schemaName, relationName, kind);
};
