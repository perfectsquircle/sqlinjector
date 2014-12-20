exports.staticAssetMaxAge = 0;
exports.dbConnectionString = "postgres://calvin:postgres@localhost/sqlinjector";
exports.passwordHashRounds = 10;

if (process.env.NODE_ENV === "production") {
    exports.staticAssetMaxAge = 604800000; // 1 week
}
