var path = require("path");
var config = require("../config");
var databaseFile = path.join(config.home, 'app.db');

module.exports = {
    client: 'sqlite3',
    connection: {
        filename: databaseFile
    },
    migrations: {
        tableName: 'knex_migrations'
    }
};
