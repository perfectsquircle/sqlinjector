'use strict';

exports.up = function(knex, Promise) {
    return knex.schema.table("connection", function(connection) {
        connection.text("name");
        connection.text("color");
    });
};

exports.down = function(knex, Promise) {
    return knex.schema.table("connection", function(connection) {
        connection.dropColumn("name");
        connection.dropColumn("color");
    });
};
