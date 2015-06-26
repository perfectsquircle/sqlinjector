var $ = require("domtastic");
var BasicConsoleInputView = require("./BasicConsoleInputView");
var AdvancedConsoleInputView = require("./AdvancedConsoleInputView");

var ConsoleView = module.exports = function() {
    this.resultArea = $(".results");
    this.timer = $(".result-stats .timer");
    this.params = $(".statement-area .param");
    this.resultCount = $(".result-stats .result-count");

    //$(".statement-form").on("submit", this.handleStatementFormSubmit.bind(this));
    $(".execute-statement-button").on("mousedown", this.handleExecuteStatementClick.bind(this));

    //this.consoleInputView = new BasicConsoleInputView($(".statement-area .console-input"), this.postConsole.bind(this));
    this.consoleInputView = new AdvancedConsoleInputView($(".statement-area .console-input"), this.postConsole.bind(this));
};

ConsoleView.prototype = {
    handleResultsHtml: function(resultHtml) {
        this.resultArea.html(resultHtml);
        this.populateResultCount();
    },

    handleError: function(error) {
        var message = (error && error.message) || error;
        if (message) {
            this.resultArea.html("<pre>" + message + "</pre>");
            this.populateResultCount();
        }
    },

    startTimer: function() {
        var self = this;
        var timerStart;
        var timer = this.timer;
        this.timerAnimationRequest = requestAnimationFrame(function step(timestamp) {
            if (!timerStart) {
                timerStart = timestamp;
            }
            timer.text(Math.floor(timestamp - timerStart) + "ms");
            self.timerAnimationRequest = requestAnimationFrame(step);
        });
    },

    stopTimer: function() {
        cancelAnimationFrame(this.timerAnimationRequest);
    },

    populateResultCount: function() {
        var count = $(".result-area tbody tr").length;
        var resultCount = this.resultCount;

        if (count === 1) {
            resultCount.text("1 result");
        } else {
            resultCount.text(count + " results");
        }
    },

    handleExecuteStatementClick: function(e) {
        e.preventDefault();
        this.postConsole();
    },

    handleStatementFormSubmit: function(e) {
        e.preventDefault();
        this.postConsole();
    },

    postConsole: function() {
        var self = this;
        this.startTimer();
        var statement = this.getConsoleInputValue();
        var queryParams = this.params.map(function(param) {
            return param.value;
        }).filter(function(param) {
            return param.length;
        });

        fetch("/console/" + App.connectionId, {
                credentials: "same-origin",
                method: "post",
                headers: {
                    'Accept': 'text/*',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    queryText: statement,
                    queryParams: queryParams
                })
            }).then(function(response) {
                return response.text();
            }).then(function(text) {
                if (text.trim().startsWith("<")) {
                    self.handleResultsHtml(text);
                } else {
                    self.handleError(text);
                }
            })
            .catch(this.handleError.bind(this))
            .then(function() {
                self.stopTimer();
            });

    },

    getConsoleInputValue: function() {
        return this.consoleInputView ? this.consoleInputView.getValue() : "";
    }
};
