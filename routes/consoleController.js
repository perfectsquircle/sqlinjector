var db = require("../lib/db");

exports.getConsole = function(req, res, next) {
    res.render("console");
};

exports.postConsole = function(req, res, next) {
    var query = req.body.query;
    
    if (query) {
        db.query(query, [], function(rows) {
            res.render("console", { query: query, rows: rows });
        });
    }
}