var pg = require("pg.js");
var Promise = require("bluebird");
Promise.promisifyAll(pg);
Promise.promisifyAll(pg.Client);
var config = require("../config");

exports.getClient = function() {
    return pg.connectAsync(config.dbConnectionString);
};