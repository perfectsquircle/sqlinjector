var logger = require("../lib/logger");

exports.errorHandler = function(error, req, res, next) {
    if (req.xhr) {
        res.status(500).json(error.toString());
    } else {
        next(error);
    }
};
