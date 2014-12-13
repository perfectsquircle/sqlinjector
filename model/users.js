var db = require("../lib/db");
var Bluebird = require("bluebird");
var bcrypt = Bluebird.promisifyAll(require("bcryptjs"));

exports.getActive = function() {
    return db.getClient().spread(function(client, done) {
        return client.queryAsync(
            "select * from sqin.User where inactiveDate is null"
        ).finally(done);
    }).then(function(result) {
        return result.rows;
    });
};

exports.authenticate = function(username, password) {
    return db.getClient().spread(function(client, done) {
        return client.queryAsync(
            "select * from sqin.User where username = $1 and inactiveDate is null",
            [ username ]
        ).finally(done);
    }).then(function(result) {
        var user = result && result.rows.length && result.rows[0];
        if (user) {
            return [ user, bcrypt.compareAsync(password, user.password) ];
        }
    }).spread(function(user, correctPassword) {
        if (user && correctPassword) {
            return user;
        }
    });
};

