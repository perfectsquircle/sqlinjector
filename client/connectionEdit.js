var $ = require("domtastic");
var ConnectionEditView = require("./views/ConnectionEditView");

$(document).ready(function() {
    var connectionEditView = new ConnectionEditView($("#connection-edit-view"));
});
