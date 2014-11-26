#!/usr/local/bin/node

var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('./app.db');
var fs = require("fs");

var schema = fs.readFileSync("./schema-lite.sql", "utf-8");

db.serialize(function() {
  db.run(schema);
});

db.close(function(err) {
    if (err) {
        console.error(err);
    }
});
