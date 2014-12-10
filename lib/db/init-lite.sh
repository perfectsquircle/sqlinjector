#!/usr/local/bin/node

var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('../app.db');
var fs = require("fs");

var schema = fs.readFileSync("./schema-lite.sql", "utf-8");
var sample = fs.readFileSync("./sample-lite.sql", "utf-8");

db.serialize(function() {
  db.run(schema);
  db.run(sample);
});

db.close(function(err) {
    if (err) {
        console.error(err);
    }
});
