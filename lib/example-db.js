var pg = require("pg.js");
var conString = "postgres://postgres:postgres@localhost/booktown";
var logger = require("./logger");

exports.getConnection = function() {

};

exports.query = function(q, params, cb) {
    pg.connect(conString, function(err, client, done) {
        if (err) {
            return cb(err);
        }
        client.query({
            text: q,
            rowMode: "array"
        }, params, function(err, result) {
            //call `done()` to release the client back to the pool
            done();
            cb(err, result);
        });
    });
};
