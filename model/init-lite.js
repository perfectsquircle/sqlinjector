#!/usr/bin/env node

var databaseFile = "./app.db";
var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database(databaseFile);
var fs = require("fs");

fs.renameSync(databaseFile, databaseFile + (new Date().toString()));

var schema = fs.readFileSync("./schema-lite.sql", "utf-8");
var sample = fs.readFileSync("./sample-lite.sql", "utf-8");

db.serialize(function() {
    db.exec(schema);
});

db.close();
