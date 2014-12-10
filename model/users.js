var db = require("../lib/db");

exports.getActive = function() {
    return db.getClient().spread(function(client, done) {
        return client.queryAsync(
            "select * from sqin.User where inactiveDate is null"
        );
    }).then(function(result) {
        return result.rows;
    });
};