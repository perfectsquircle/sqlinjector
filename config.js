exports.staticAssetMaxAge = 0;
exports.passwordHashRounds = 10;
exports.consoleSessionTimeout = 3600; // 1 hour
exports.prettyHtml = true;
exports.home = process.env.SQLINJECTOR_HOME || __dirname;
exports.sessionSecret = require("./config.sessionSecret.js")(exports.home);
exports.defaultRowLimit = 1000;

exports.databaseTypes = {
    pg: "PostgreSQL"
};

exports.connectionColors = {
    "C7AAFF": "Purple",
    "E89F9B": "Red",
    "FFE9B7": "Yellow",
    "B7E89B": "Green",
    "B1FBFF": "Blue"
};

if (process.env.NODE_ENV === "production") {
    exports.staticAssetMaxAge = 604800000; // 1 week
    exports.prettyHtml = false;
}
