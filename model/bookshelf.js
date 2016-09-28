var config = require("../config");
var path = require("path");
var knex = require("knex")(require("./knexfile")[process.env.NODE_ENV || 'development']);
var fs = require("fs");
var databaseFile = path.join(config.home, 'app.db');
var logger = require("../lib/logger");

// function migrateLatest() {
//     knex.migrate.latest({
//         directory: "./model/migrations",
//         knexfile: "./model/knexfile.js"
//     });
// }

// var promise;
// if (!fs.existsSync(databaseFile)) {
//     logger.info("Creating file", databaseFile);
//     var sqlite3 = require('sqlite3').verbose();
//     var db = new sqlite3.Database(databaseFile);
//     var schema = fs.readFileSync(path.join(__dirname, "schema-lite.sql"), "utf-8");
//     db.serialize(function() {
//         db.exec(schema);
//         db.close();
//         migrateLatest();
//     });
// } else {
//     migrateLatest();
// }


module.exports = require("bookshelf")(knex);
