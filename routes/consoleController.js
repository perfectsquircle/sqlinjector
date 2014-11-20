var db = require("../lib/db");

exports.getConsole = function(req, res, next) {
    res.render("console");
};

exports.postConsole = function(req, res, next) {
    var query = req.body.query;
    
    if (query) {
        db.query(query, [], function(error, result) {
            console.dir(result);
            res.render("console", { error: error, query: query, result: result });
        });
    }
};