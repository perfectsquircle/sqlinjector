var $ = require("domtastic");
var SchemaView = require("./views/SchemaView");

$(document).ready(function() {
    var schemaView = new SchemaView($(".everything"));
});
