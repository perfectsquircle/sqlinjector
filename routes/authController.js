var User = require("../model/User");
var logger = require("../lib/logger");

exports.getLogin = function(req, res, next) {
    res.render("login/login", {
        username: null
    });
};

exports.postLogin = function(req, res, next) {
    var username = req.body && req.body.username;
    var password = req.body && req.body.password;

    User.authenticate(username, password).then(function(user) {
        req.session.user = user;
        res.redirect("/");
    }).catch(function(error) {
        console.error(error);
        res.render("login/login", {
            username: username,
            error: error
        });
    });
};

exports.getLogout = function(req, res, next) {
    delete req.session.user;
    res.redirect("/login");
};

exports.authMiddleware = function(req, res, next) {
    if (req.session.user) {
        return next();
    } else {
        if (req.xhr) {
            res.send(401, "No session");
        } else {
            res.redirect("/login");
        }
    }
};

exports.getRegister = function(req, res, next) {
    res.render("login/register", {
        username: null
    });
};

exports.postRegister = function(req, res, next) {
    var username = req.body && req.body.username;
    var password = req.body && req.body.password;

    User.create(username, password).then(function(user) {
        logger.debug(user);
        req.session.user = user;
        res.redirect("/");
    }).catch(function(error) {
        console.error(error);
        res.render("login/register", {
            username: username,
            error: error
        });
    });
};
