var $ = require("domtastic");
var ConsoleView = require("./views/ConsoleView");

$(document).ready(function() {
    var consoleView = new ConsoleView();
});

window.addEventListener("beforeunload", function(e) {
    if ($(".statement-form .console-input").value) {
        return "Your current statement will be lost.";
    }
});
