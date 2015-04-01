var logger = require("./logger");
var Bluebird = require("bluebird");

var ConsoleSession = module.exports = function(consoleSessionKey, connection, user) {
    this.consoleSessionKey = consoleSessionKey;
    this.connection = connection;
    this.knex = connection.getClient();
    this.user = user;
};

ConsoleSession.prototype = {
    handleQuery: function(queryText, params) {
        var self = this;
        // TODO: sanitize input
        return this.knex.raw(queryText, params)
            .options({
                rowMode: "array"
            });
    },

    close: function() {
        var promise;
        if (this.knex) {
            promise = this.knex.destroy();
            delete this.knex;
        } else {
            promise = Bluebird.resolve();
        }

        return promise;
    }
};
