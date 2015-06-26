var $ = require("domtastic");
//var StatementParser = require("../../lib/parser/StatementParser");
var CodeMirror = require("codemirror");
require("codemirror/mode/sql/sql");

var BasicConsoleInputView = module.exports = function($el, submit) {
    this.$el = $el;
    //this.$el.on("keydown", this.handleKeydown.bind(this));
    //this.$el.on("input", this.handleInput.bind(this));

    this.editor = CodeMirror.fromTextArea($el[0], {
        lineNumbers: true,
        mode: "text/x-sql"
    });

    this.submit = submit;
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
        //console.debug(e);
    },

    getValue: function() {
        //var textArea = this.$el[0];
        //var value = textArea.value;
        //var selectionStart = textArea.selectionStart;
        //var selectionEnd = textArea.selectionEnd;

        //var statementParser = new StatementParser(value);
        //return statementParser.getStatementUnderCaret(selectionStart, selectionEnd);
        return this.editor.getValue();
    }


};
