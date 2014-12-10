var db = require("../lib/example-db");
var logger = require("../lib/logger");

exports.getConsole = function(req, res, next) {
    res.render("console/console");
};

exports.postConsole = function(req, res, next) {
    var query = req.body.query;
    
    if (query) {
        db.query(query, [], function(error, result) {
            logger.debug(result);
            res.render("console/console", { error: error, query: query, result: result });
        });
    }
};