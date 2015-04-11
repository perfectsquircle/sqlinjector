var logger = require("./../logger");
var Bluebird = require("bluebird");

var ConsoleSession = module.exports = function(consoleSessionKey, connection, user) {
    this.consoleSessionKey = consoleSessionKey;
    this.connection = connection;
    this.client = connection.getClient();
    this.user = user;
};

ConsoleSession.prototype = {
    handleQuery: function(queryText, params) {
        var self = this;
        // TODO: sanitize input
        return this.client.raw(queryText, params);
    },

    getSchema: function() {
        return this.client.getSchema();
    },

    close: function() {
        this.client.close();
    }
};
