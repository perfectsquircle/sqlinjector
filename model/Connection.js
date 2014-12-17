var bookshelf = require("../lib/bookshelf");

var Connection = bookshelf.Model.extend({
    tableName: "connection",
    idAttribute: "connectionId"
});

module.exports = Connection;

