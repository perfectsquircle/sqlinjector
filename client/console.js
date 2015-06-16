var $ = require("domtastic");
var ConsoleView = require("./views/ConsoleView");

$(document).ready(function() {
    var consoleView = new ConsoleView();

    window.onbeforeunload = function(e) {
        if (consoleView.getConsoleInputValue()) {
            return "Your current statement will be lost.";
        }
    };
});
