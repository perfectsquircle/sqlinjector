var $ = require("domtastic");
var RelationInformationView = require("./views/RelationInformationView");
var SchemaView = require("./views/SchemaView");

$(document).ready(function() {
    var relationInformationView = new RelationInformationView($(".relation-information"));

    var schemaView = new SchemaView($(".everything"), function(schema, relation) {
        relationInformationView.handleRelationSelected(schema, relation);
    });
});
