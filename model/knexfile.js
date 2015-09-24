var path = require("path");
var config = require("../config");

module.exports = {
    client: 'sqlite3',
    connection: {
        filename: path.join(config.home, 'app.db')
    },
    migrations: {
        tableName: 'knex_migrations'
    }
};
