//var permissions = require("../model/permissions");
var users = require("../model/users");
var Promise = require("bluebird");

exports.getadminPage = function(req, res, next) {
    /*var user = res.locals.user;
    if (!user.hasPermission("admin")) {
        return next("You are not an admin.");
    }*/
    
    Promise.join(users.getActive(), //connections.getActive(), reports.getActive() ])
        function(users, connections, reports) {
            res.render("admin/admin", {
                users: users,
                connections: connections,
                reports: reports
            });
    }).error(next);       
}