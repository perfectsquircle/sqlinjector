var pg = require("pg.js");
var Bluebird = require("bluebird");
Bluebird.promisifyAll(pg);
Bluebird.promisifyAll(pg.Client);
var config = require("../config");

exports.getClient = function() {
    return pg.connectAsync(config.dbConnectionString);
};