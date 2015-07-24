var fs = require("fs");
var crypto = require("crypto");
var assert = require("assert");

var secret;
var filename = ".sessionSecret";

try {
    secret = fs.readFileSync(filename, "utf-8");
} catch (e) {
    secret = crypto.randomBytes(32).toString("base64");
    fs.writeFileSync(filename, secret, "utf-8");
}

assert(secret);

module.exports = secret;
