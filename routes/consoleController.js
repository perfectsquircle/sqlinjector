exports.getConsole = function(req, res, next) {
    res.render("console");
};

exports.postConsole = function(req, res, next) {
    var query = req.body.query;
    res.render("console", { query: query });
}