var path = require("path");
var config = require("../config");
var databaseFile = path.join(config.home, 'app.db');

var options = {
    client: 'sqlite3',
    connection: {
        filename: databaseFile
    },
    migrations: {
        tableName: 'knex_migrations'
    }
};

module.exports = {
  development: options,
  staging: options,
  production: options
}
