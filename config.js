exports.staticAssetMaxAge = 0;
exports.dbConnectionString = "postgres://calvin:postgres@localhost/sqlinjector";
exports.passwordHashRounds = 10;
exports.consoleSessionTimeout = 600000;
exports.prettyHtml = true;

if (process.env.NODE_ENV === "production") {
    exports.staticAssetMaxAge = 604800000; // 1 week
    exports.prettyHtml = false;
}
