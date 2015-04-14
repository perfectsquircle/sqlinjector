var util = require("util");

exports.getInformation = function(client, schema, relation) {
    var select = util.format("select * from %s.%s limit 10", schema, relation);
    return client.raw(select).then(function(result) {
        return {
            schema: schema,
            relation: relation,
            result: result
        };
    });
};
