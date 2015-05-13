exports.staticAssetMaxAge = 0;
exports.dbConnectionString = "postgres://calvin:postgres@localhost/sqlinjector";
exports.passwordHashRounds = 10;
exports.consoleSessionTimeout = 3600000;
exports.maxSessions = 50;
exports.prettyHtml = true;

exports.databaseTypes = {
    pg: "PostgreSQL"
};

exports.connectionColors = {
    "CA4653": "Red",
    "E99240": "Orange",
    "E5E16D": "Yellow",
    "65B553": "Green",
    "099EA1": "Blue"
};

if (process.env.NODE_ENV === "production") {
    exports.staticAssetMaxAge = 604800000; // 1 week
    exports.prettyHtml = false;
}
