exports.staticAssetMaxAge = 0;
exports.dbConnectionString = "postgres://calvin:postgres@localhost/sqlinjector";
exports.passwordHashRounds = 10;
exports.connectionKeyTimeout = 10000;
exports.consoleWebSocketPort = 3002;

if (process.env.NODE_ENV === "production") {
    exports.staticAssetMaxAge = 604800000; // 1 week
}
