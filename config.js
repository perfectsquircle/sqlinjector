exports.staticAssetMaxAge = 0;
exports.dbConnectionString = "postgres://calvin:postgres@localhost/sqlinjector";

if (process.env.NODE_ENV === "production") {
    exports.staticAssetMaxAge = 604800000; // 1 week
}