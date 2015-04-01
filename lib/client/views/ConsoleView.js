var $ = require("domtastic");

var ConsoleView = module.exports = function() {
    this.resultArea = $(".result-area");
    this.timer = $(".result-stats .timer");
    this.consoleInput = $(".statement-form .console-input");
    this.params = $(".statement-form .param");
    this.resultCount = $(".result-stats .result-count");

    $(".statement-form").on("submit", this.handleStatementFormSubmit.bind(this));
};

ConsoleView.prototype = {
    handleResultsHtml: function(resultHtml) {
        this.stopTimer();
        this.resultArea.html(resultHtml);
        this.populateResultCount();
    },

    handleError: function(error) {
        this.stopTimer();
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

    handleStatementFormSubmit: function(e) {
        e.preventDefault();
        this.startTimer();
        console.debug("form submit", this.consoleInput.value);
        var queryParams = this.params.map(function(param) {
            return param.value;
        }).filter(function(param) {
            return param.length;
        });

        fetch("/consoleSession/" + App.consoleSessionKey + "/query", {
                method: "post",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    queryText: this.consoleInput.val(),
                    queryParams: queryParams
                })
            }).then(function(response) {
                return response.text();
            }).then(this.handleResultsHtml.bind(this))
            .catch(this.handleError.bind(this));

    }
};
