var logger = require("../lib/logger");

exports.notFound = function(req, res, next) {
    logger.warn("404", "No routes match", req.method, req.url);
    res.status(404);
    if (req.xhr) {
        res.end();
    } else {
        res.render("error/error", {
            error: "404: Page not found"
        });
    }
};

exports.errorHandler = function(error, req, res, next) {
    logger.error(error);
    if (req.xhr) {
        res.status(500).json({
            message: error.toString()
        });
    } else {
        res.status(500);
        res.render("error/error", {
            error: error
        });
    }
};
