var $ = require("domtastic");
var _ = require("lodash");
var resultRowsTemplate = require("../../views/console/partial/resultsTable.jade");
var nonSelectTemplate = require("../../views/console/partial/nonSelect.jade");
var BasicConsoleInputView = require("./BasicConsoleInputView");
var AdvancedConsoleInputView = require("./AdvancedConsoleInputView");
var ParametersView = require("./ParametersView");

var ConsoleView = module.exports = function() {
    this.resultArea = $(".results");
    this.timer = $(".result-stats .timer");
    this.resultCount = $(".result-stats .result-count");
    this.executeStatementButton = $(".execute-statement-button");

    this.executeStatementButton.on("mousedown", this.handleExecuteStatementClick.bind(this));

    this.consoleInputView = new AdvancedConsoleInputView($(".statement-area .console-input-outer"), this.postConsole.bind(this));
    //this.consoleInputView = new BasicConsoleInputView($(".statement-area .console-input-outer"), this.postConsole.bind(this));

    this.parametersView = new ParametersView($(".parameters"));
};

ConsoleView.prototype = {
    handleResults: function(result) {
        this.populateResultCount(result.rowCount);
        if (result.command === "SELECT") {
            this.resultArea.html(resultRowsTemplate({
                result: result
            }));
        } else {
            this.resultArea.html(nonSelectTemplate({
                result: result
            }));
        }
    },

    handleError: function(error) {
        var message = (error && error.message) || error;
        if (message) {
            this.resultArea.html("<pre>" + message + "</pre>");
            this.populateResultCount();
        }
        return error;
    },

    startTimer: function() {
        var self = this;
        var timerStart;
        var timer = this.timer;

        this.resultArea.addClass("fade");
        this.resultCount.val("");

        this.timerAnimationRequest = requestAnimationFrame(function step(timestamp) {
            if (!timerStart) {
                timerStart = timestamp;
            }
            timer.val(Math.floor(timestamp - timerStart) + "ms");
            self.timerAnimationRequest = requestAnimationFrame(step);
        });
    },

    stopTimer: function() {
        cancelAnimationFrame(this.timerAnimationRequest);
    },

    addFade: function() {
        this.resultArea.addClass("fade");
    },

    removeFade: function() {
        this.resultArea.removeClass("fade");
    },

    enableButton: function() {
        this.executeStatementButton.prop("disabled", false);
    },

    disableButton: function() {
        this.executeStatementButton.prop("disabled", true);
    },

    populateResultCount: function(count) {
        if (!_.isNumber(count)) {
            count = 0;
        }
        var resultCount = this.resultCount;
        if (count === 1) {
            resultCount.val("1 result");
        } else {
            resultCount.val(count + " results");
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
        if (this.req) {
            return;
        }

        var self = this;
        this.startTimer();
        this.addFade();
        this.disableButton();
        var statement = this.getConsoleInputValue();
        var queryParams = this.getConsoleInputParams();

        this.req = fetch("/console/" + App.connectionId, {
                credentials: "same-origin",
                method: "post",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    queryText: statement,
                    queryParams: queryParams
                })
            }).then(function(response) {
                if (response.status === 200) {
                    return response.json().then(function(json) {
                        self.handleResults(json);
                    });
                } else {
                    return response.json().then(function(json) {
                        return Promise.reject(json);
                    });
                }
            })
            .catch(this.handleError.bind(this))
            .then(function() {
                self.stopTimer();
                self.removeFade();
                self.enableButton();
                self.req = null;
            });

    },

    getConsoleInputValue: function() {
        return this.consoleInputView ? this.consoleInputView.getValue() : "";
    },

    getConsoleInputParams: function() {
        return this.parametersView ? this.parametersView.getParams() : [];
    }
};
