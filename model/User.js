var Bluebird = require("bluebird");
var bcrypt = Bluebird.promisifyAll(require("bcryptjs"));
var logger = require("../lib/logger");
var bookshelf = require("./bookshelf");
var config = require("../config");
var assert = require("assert");

var User = bookshelf.Model.extend({
    tableName: "user",
    idAttribute: "userId"

}, {
    authenticate: Bluebird.method(function(username, password) {
        assert(username && password, "Username and password are both required");
        return this.forge({
            inactiveDate: null,
            username: username
        }).fetch().then(function(user) {
            if (!user) {
                throw new Error("No such user");
            } else if (!user.get("password")) {
                throw new Error("User not allowed");
            }
            return [user, bcrypt.compareAsync(password, user.get("password"))];
        }).spread(function(user, correctPassword) {
            if (user && correctPassword) {
                return user;
            } else {
                throw new Error("Incorrect password");
            }
        });
    }),

    setPassword: function(username, password) {
        assert(username && password, "Username and password are both required");
        var userPromise = this.forge({
            username: username
        }).fetch({
            require: true
        });
        var hashPromise = bcrypt.hashAsync(password, config.passwordHashRounds);
        return Bluebird.join(userPromise, hashPromise).spread(function(user, hash) {
            user.set("password", hash);
            return user.save();
        });
    }
});

module.exports = User;
