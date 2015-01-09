#!/usr/bin/env node

var args = process.argv;
if (args.length != 4) {
    console.log("Usage: node setPassword {username} {password}");
    process.exit(1);
}

var username = args[2];
var password = args[3];

var User = require("../model/User");

User.setPassword(username, password).then(function(user) {
    console.log("Password set to: ", user.get("password"));
    process.exit(0);
}).catch(function(error) {
    console.error(error);
    process.exit(1);
});
