'use strict';

exports.up = function(knex, Promise) {
    return knex.schema.table("connection", function(connection) {
        connection.integer("position");
    });
};

exports.down = function(knex, Promise) {
    return knex.schema.table("connection", function(connection) {
        connection.dropColumn("position");
    });
};
