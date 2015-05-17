var path = require("path");

module.exports = {
    client: 'sqlite3',
    connection: {
        filename: path.join(__dirname, 'app.db')
    },
    migrations: {
        tableName: 'knex_migrations'
    }
};
