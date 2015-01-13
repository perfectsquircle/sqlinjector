var logger = require("../lib/logger");

exports.errorHandler = function(error, req, res, next) {
    logger.error(error);
    if (req.xhr) {
        res.status(500).json({ message: error.toString() });
    } else {
        next(error);
    }
};
