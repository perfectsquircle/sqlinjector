//var permissions = require("../model/permissions");
//var users = require("../model/users");
//var Promise = require("bluebird");
var User = require("../model/user");
var logger = require("../lib/logger");

exports.getadminPage = function(req, res, next) {
    /*var user = res.locals.user;
    if (!user.hasPermission("admin")) {
        return next("You are not an admin.");
    }*/
    
    //Promise.join(users.getActive(), //connections.getActive(), reports.getActive() ])
    //    function(users, connections, reports) {
	User.forge({ inactiveDate: null }).fetchAll().then(function(users) {
		logger.debug(users);
        res.render("admin/admin", {
            users: users.toJSON(),
            //connections: connections,
            //reports: reports
        });
    }).error(next);       
};