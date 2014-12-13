var users = require("../model/users");
var User = require("../model/User");

exports.getLogin = function(req, res, next) {
    res.render("login/login", { username: null });
};

exports.postLogin = function (req, res, next) {
    var username = req.body && req.body.username;
    var password = req.body && req.body.password;
    
    User.authenticate(username, password).then(function(user) {
        req.session.user = user;
        res.redirect("/");
    }).catch(function(error) {
        console.error(error);
        res.render("login/login", { username: username, error: error });
    });
};

exports.authMiddleware = function(req, res, next) {
    if (!req.session.user) {
        res.redirect("/login");
    } else {
        return next();
    }
};