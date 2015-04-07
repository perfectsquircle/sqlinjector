var path = require("path");

var knex = require("knex")({
    client: "sqlite",
    connection: {
        filename: path.join(__dirname, "app.db")
    },
    //debug: true
});

module.exports = require("bookshelf")(knex);
