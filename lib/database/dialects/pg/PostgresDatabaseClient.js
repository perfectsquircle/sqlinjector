var util = require("util");
var DatabaseClient = require("../../DatabaseClient");
var pg = require("pg");
var _ = require("lodash");
var Bluebird = require("bluebird");

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

p.raw = function(statement, params) {
    var client = this.client;
    var rowLimit = this.options.rowLimit;

    var connectionPromise;
    if (client.readyForQuery) {
        connectionPromise = Bluebird.resolve();
    } else {
        connectionPromise = client.connectAsync();
    }
    return connectionPromise.then(function() {
        return new Bluebird(function(resolve, reject) {
            var req = client.query({
                text: statement,
                values: params,
                rowMode: "array"
            });

            req.on("row", function rowHandler(row, result) {
                if (result.rowCount > rowLimit) {
                    req.removeAllListeners("row");
                    //resolve(rowBuffer);
                }
                result.addRow(row);
            });

            req.on("error", function(error) {
                // Todo: parse errors
                reject(error);
            });

            req.on("end", function(result) {
                console.log(result);
                resolve(result);
            });
        });
    }).then(function(result) {
        console.log(result);
        return result;
    });
};

p.close = function() {
    return this.client && this.client.end();
};
