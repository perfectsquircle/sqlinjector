var util = require("util");
var fs = require("fs");
var Bluebird = require("bluebird");
var path = require("path");

var ownerQuery = fs.readFileSync(path.join(__dirname, "queries", "owner.sql"), "utf-8");
var columnsQuery = fs.readFileSync(path.join(__dirname, "queries", "columns2.sql"), "utf-8");
var viewQuery = fs.readFileSync(path.join(__dirname, "queries", "view.sql"), "utf-8");
var functionQuery = fs.readFileSync(path.join(__dirname, "queries", "function.sql"), "utf-8");
var functionOwnerQuery = fs.readFileSync(path.join(__dirname, "queries", "functionOwner.sql"), "utf-8");

function sampleQuery(schema, relation) {
    return util.format('select * from "%s"."%s" limit 25', schema, relation);
}

function countQuery(schema, relation) {
    return util.format('select count(*) as count from "%s"."%s"', schema, relation);
}

exports.getInformation = function(client, schema, relation, kind) {
    if (kind === "table") {
        return Bluebird.all([
            client.raw(sampleQuery(schema, relation)),
            client.raw(countQuery(schema, relation), [], {
                rowMode: "object"
            }),
            client.raw(ownerQuery, [schema, relation], {
                rowMode: "object"
            }),
            client.raw(columnsQuery, [schema, relation], {
                rowMode: "object"
            })
        ]).spread(function(sample, count, owner, columns) {
            return {
                sample: sample,
                count: count.rows[0].count,
                owner: owner.rows[0].owner,
                tablespace: owner.rows[0].tablespace,
                columns: columns.rows
            };
        });
    } else if (kind === "view") {
        return Bluebird.all([
            client.raw(sampleQuery(schema, relation)),
            client.raw(countQuery(schema, relation), [], {
                rowMode: "object"
            }),
            client.raw(ownerQuery, [schema, relation], {
                rowMode: "object"
            }),
            client.raw(viewQuery, [schema, relation], {
                rowMode: "object"
            })
        ]).spread(function(sample, count, owner, definition) {
            return {
                sample: sample,
                count: count.rows[0].count,
                owner: owner.rows[0].owner,
                tablespace: owner.rows[0].tablespace,
                definition: definition.rows[0].definition
            };
        });
    } else if (kind == "function") {
        return Bluebird.all([
            client.raw(functionOwnerQuery, [schema, relation], {
                rowMode: "object"
            }),
            client.raw(functionQuery, [schema, relation], {
                rowMode: "object"
            })
        ]).spread(function(owner, definition) {
            return {
                owner: owner.rows[0].owner,
                definition: definition.rows[0].definition
            };
        });
    } else {
        return client.raw(ownerQuery, [schema, relation], {
            rowMode: "object"
        }).then(function(owner) {
            return {
                owner: owner.rows[0].owner,
                tablespace: owner.rows[0].tablespace,
            };
        });
    }
};
