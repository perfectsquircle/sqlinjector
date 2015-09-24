var fs = require("fs");
var crypto = require("crypto");
var assert = require("assert");
var path = require("path");

module.exports = function(home) {
    var secret;
    var filename = path.join(home, "sessionSecret");

    try {
        secret = fs.readFileSync(filename, "utf-8");
    } catch (e) {
        secret = crypto.randomBytes(32).toString("base64");
        fs.writeFileSync(filename, secret, "utf-8");
    }

    assert(secret);
    return secret;
};
