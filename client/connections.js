var $ = require("domtastic");
var ConnectionsView = require("./views/ConnectionsView");

$(document).ready(function() {
    var connectionsView = new ConnectionsView($(".connections"));
});
