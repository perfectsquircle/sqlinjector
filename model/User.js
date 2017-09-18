var Bluebird = require("bluebird");
var bcrypt = Bluebird.promisifyAll(require("bcryptjs"));
var logger = require("../lib/logger");
var config = require("../config");
var assert = require("assert");
var path = require("path");

var Nedb = require("nedb-promise");
var users = new Nedb({
    filename: path.join(config.home, "users.db"),
    autoload: true
});

function parse(user) {
    if (!user) {
        return;
    }
    user.userId = user._id;
    return user;
}

var User = {
    getUser: function(username) {
        return Bluebird.resolve(users.findOne({
            username: username
        })).then(parse);
    },

    authenticate: Bluebird.method(function(username, password) {
        assert(username && password, "Username and password are both required");
        return User.getUser(username).then(function(user) {
            if (!user) {
                throw new Error("No such user");
            } else if (!user.password) {
                throw new Error("User not allowed");
            }
            return [user, bcrypt.compareAsync(password, user.password)];
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
        var userPromise = User.getUser(username);
        var hashPromise = bcrypt.hashAsync(password, config.passwordHashRounds);
        return Bluebird.join(userPromise, hashPromise).spread(function(user, hash) {
            user.password = hash;
            return User.update(user);
        });
    },

    create: function(username, password) {
        assert(username && password, "Username and password are both required");

        return User.getUser(username).then(function(dbUser) {
            if (dbUser) {
                throw new Error("User already exists");
            }
            return bcrypt.hashAsync(password, config.passwordHashRounds);
        }).then(function(hash) {
            return users.insert({
                username: username,
                password: hash
            });
        }).then(parse);
    },

    update: function(attributes) {
        return users.update({
            _id: attributes._id
        }, attributes).then(parse);
    }
};

module.exports = User;
