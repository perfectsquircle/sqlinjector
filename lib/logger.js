var winston = require("winston");
var transports = [];
var config = require("../config");
var path = require("path");

if (process.env.NODE_ENV === "production") {
    transports.push(new winston.transports.File({
        filename: path.join(config.home, "sqlinjector.log"),
        level: "info",
        json: false
    }));
} else {
    transports.push(new winston.transports.Console({
        level: "debug"
    }));
}

module.exports = new winston.Logger({
    transports: transports
});
