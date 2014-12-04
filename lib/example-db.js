var pg = require("pg.js");
var conString = "postgres://postgres:postgres@localhost/booktown";


exports.getConnection = function() {
     
};

exports.query = function(q, params, cb) {
    pg.connect(conString, function(err, client, done) {
        if(err) {
            return console.error('error fetching client from pool', err);
        }
        client.query({ text: q, rowMode: "array" }, params, function(err, result) {
            //call `done()` to release the client back to the pool
            done();

            if(err) {
                console.error('error running query', err);
            }
            cb(err, result);
        });
    });
};