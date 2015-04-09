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

    close: function() {
        var promise;
        if (this.client) {
            promise = this.client.destroy();
            delete this.client;
        } else {
            promise = Bluebird.resolve();
        }

        return promise;
    }
};
