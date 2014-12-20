#!/usr/bin/node

var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('../app.db');
var fs = require("fs");

fs.unlinkSync("../app.db");

var schema = fs.readFileSync("./schema-lite.sql", "utf-8");
var sample = fs.readFileSync("./sample-lite.sql", "utf-8");

db.serialize(function() {
    db.exec(schema);
    db.exec(sample);
});

db.close();
