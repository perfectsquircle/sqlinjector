var util = require("util");
var fs = require("fs");
var Bluebird = require("bluebird");
var path = require("path");

var ownerQuery = fs.readFileSync(path.join(__dirname, "owner.sql"), "utf-8");
var columnsQuery = fs.readFileSync(path.join(__dirname, "columns2.sql"), "utf-8");

exports.getInformation = function(client, schema, relation) {
    var sampleQuery = util.format('select * from "%s"."%s" limit 25', schema, relation);
    var countQuery = util.format('select count(*) as count from "%s"."%s"', schema, relation);

    return Bluebird.all([
        client.raw(sampleQuery),
        client.raw(countQuery, [], {
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
            schema: schema,
            relation: relation,
            sample: sample,
            count: count.rows[0].count,
            owner: owner.rows[0].owner,
            tablespace: owner.rows[0].tablespace,
            columns: columns.rows
        };
    });
};
