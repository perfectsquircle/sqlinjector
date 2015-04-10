var PostgresDatabaseClient = require("../../../lib/database/dialects/pg/PostgresDatabaseClient");

exports.testPostgres = function(test) {
    var client = new PostgresDatabaseClient({
        rowLimit: 8
    }, {
        host: "localhost",

        user: "postgres",
        password: "postgres",
        database: "booktown",
        port: 5432
    });
    test.ok(client);
    client.raw("select * from shipments;").then(function(result) {
        test.ok(result);
        test.equals(result.rows.length, 8);
    }).catch(function(e) {
        test.ok(e);
    }).finally(function() {
        test.done();
        client.close();
    });
};
