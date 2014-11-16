exports.staticAssetMaxAge = 0;

if (process.env.NODE_ENV === "production") {
    exports.staticAssetMaxAge = 604800000; // 1 week
}