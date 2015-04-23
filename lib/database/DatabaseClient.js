var _ = require("lodash");

/**
 * @type {DatabaseClient}
 */
var DatabaseClient = function(options) {

};

/**
 * Create a new {@link DatabaseClient}
 * @param {string} type The DatabaseClient type (pg, mysql, etc.)
 * @param {object} options Options object to pass to the constructor
 * @param {object} connection Connection options
 * @returns {DatabaseClient}
 */
DatabaseClient.createFromType = function(type, options, connection) {
    var dialects = require("./dialects");
    var dialect = dialects[type];
    return new dialect.DatabaseClient(options, connection);
};

DatabaseClient.prototype = Object.create({
    raw: function(queryText, parameters) {
        throw new Error("Not implemented");
    },

    getSchema: function() {
        throw new Error("Not implemented");
    },

    getRelationInformation: function(schema, relation, kind) {
        throw new Error("Not implemented");
    },

    close: function() {
        throw new Error("Not implemented");
    }
});

module.exports = DatabaseClient;
