var $ = require("domtastic");
var ConsoleView = require("./views/ConsoleView");

$(document).ready(function() {
    var consoleView = new ConsoleView();
});

window.onbeforeunload = function(e) {
    if ($(".statement-form .console-input").val()) {
        return "Your current statement will be lost.";
    }
};
