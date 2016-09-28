var util = require("util");
var _ = require("lodash");
var logger = require("../lib/logger");
var slug = require("../lib/slug");
var config = require("../config");
var path = require("path");
var Bluebird = require("bluebird");

var Nedb = require("nedb-promise");
var connections = new Nedb({ filename: path.join(config.home, "connections.db"), autoload: true });

function getTitle(attributes) {
    if (attributes.name) {
        return attributes.name;
    } else {
        return util.format("%s@%s/%s",
            attributes.username,
            attributes.hostname,
            attributes.database
        );
    }
}

function parse(attributes) {
    if (!attributes) {
        return;
    }
    attributes.title = getTitle(attributes);
    attributes.connectionId = attributes._id;
    attributes.urlTitle = slug(attributes.title);
    return attributes;
}

function parseAll(collection) {
    collection.forEach(parse);
    return collection;
}

var Connection = {

    getConnection: function (connectionId, userId) {
        return Bluebird.resolve(connections.findOne({
            _id: connectionId,
            ownerId: userId
        })).then(parse);
    },

    getConnections: function (userId) {
        return Bluebird.resolve(connections.find({
            ownerId: userId
        })).then(parseAll);
    },

    sort: function (connectionIds, userId) {
        // var self = this;
        // return this.getConnections(userId).then(function(connections) {
        //     return Bluebird.all(connections.map(function(connection) {
        //         logger.silly(connection.id, connectionIds.indexOf(connection.id));
        //         var position = connectionIds.indexOf(connection.id);
        //         var qb = self.query();
        //         return qb.where({
        //             connectionId: hashids.decode(connection.id)[0]
        //         }).update({
        //             position: position
        //         });
        //     }));
        // });
        return Bluebird.resolve(); // TODO: implement
    },

    create: function (attributes) {
        return connections.insert(attributes);
    },

    update: function (attributes) {
        return connections.update({ _id: attributes._id }, attributes);
    },
    
    delete: function (connectionId, userId) {
        return connections.remove({ _id: connectionId, ownerId: userId });
    }
};

module.exports = Connection;
