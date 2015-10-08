'use strict';

exports.up = function(knex, Promise) {
    return knex.schema.table("connection", function(connection) {
        connection.integer("port");
    });
};

exports.down = function(knex, Promise) {
    return knex.schema.table("connection", function(connection) {
        connection.dropColumn("port");
    });
};
