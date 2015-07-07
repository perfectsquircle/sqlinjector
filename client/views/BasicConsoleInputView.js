var $ = require("domtastic");
var StatementParser = require("../../lib/parser/StatementParser");
var store = require("../lib/store");
var _ = require("lodash");

var BasicConsoleInputView = module.exports = function($el, submit) {
    this.$el = $el;
    this.submit = submit;

    var textarea = this.textarea = $el.find(".console-input");
    textarea.on("keydown", this.handleKeydown.bind(this));
    textarea.on("input", this.handleInput.bind(this));

    var params = this.params = $el.find(".param");
    this.$el.on("input", ".param", this.handleInput.bind(this));

    var consoleInput = store.getConsoleInput(App.connectionId);
    if (consoleInput) {
        if (_.isString(consoleInput.query)) {
            this.setValue(consoleInput.query);
        }
        if (_.isArray(consoleInput.params)) {
            this.setParams(consoleInput.params);
        }
    }
};

BasicConsoleInputView.prototype = {

    handleKeydown: function(e) {
        switch (e.keyCode) {
            case 13:
                {
                    if (e.ctrlKey || e.metaKey) {
                        e.preventDefault();
                        this.submit();
                    }
                    break;
                }
        }
    },

    handleInput: function(e) {
        store.saveConsoleInput(App.connectionId, {
            query: this.getRawValue(),
            params: this.getParams()
        });
    },

    getRawValue: function() {
        return this.textarea.val();
    },

    getValue: function() {
        var textarea = this.textarea[0];
        var value = textarea.value;
        var selectionStart = textarea.selectionStart;
        var selectionEnd = textarea.selectionEnd;

        var statementParser = new StatementParser(value);
        return statementParser.getStatementUnderCaret(selectionStart, selectionEnd);
    },

    setValue: function(value) {
        this.textarea.val(value);
    },

    getParams: function() {
        return _.chain(this.params).map(function(param) {
            return param.value;
        }).dropRightWhile(function(param) {
            return !param.length;
        }).value();
    },

    setParams: function(params) {
        this.params.each(function(param, index) {
            if (params && params[index]) {
                param.value = params[index];
            }
        });
    }

}

;
