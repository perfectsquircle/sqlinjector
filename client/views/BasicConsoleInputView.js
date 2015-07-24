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

    this.storeKey = "console-" + App.connectionId;

    var query = store.get(this.storeKey);
    if (_.isString(query)) {
        this.setValue(query);
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
        store.put(this.storeKey, this.getRawValue());
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
    }
};
