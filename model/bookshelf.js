var path = require("path");

var knex = require("knex")(require("./knexfile"));

knex.migrate.latest({
    directory: "./model/migrations",
    knexfile: "./model/knexfile.js"
});

module.exports = require("bookshelf")(knex);
