var $ = require("domtastic");
var _ = require("lodash");
var util = require("util");
var CodeMirror = require("codemirror");
require("codemirror/mode/sql/sql");

var BasicConsoleInputView = require("./BasicConsoleInputView");
var StatementParser = require("../../lib/parser/StatementParser");

var AdvancedConsoleInputView = module.exports = function($el, submit) {
    var textarea = $el.find(".console-input");
    var editor = this.editor = CodeMirror.fromTextArea(textarea[0], {
        lineNumbers: true,
        mode: "text/x-sql"
    });
    editor.setOption("extraKeys", {
        "Ctrl-Enter": submit,
        "Cmd-Enter": submit,
        "F5": submit
    });
    editor.on("change", this.handleInput.bind(this));

    BasicConsoleInputView.apply(this, arguments);
};

util.inherits(AdvancedConsoleInputView, BasicConsoleInputView);

AdvancedConsoleInputView.prototype = _.extend(AdvancedConsoleInputView.prototype, {

    getRawValue: function() {
        return this.editor.getValue();
    },

    getValue: function() {
        //var textArea = this.$el[0];
        //var value = textArea.value;
        //var selectionStart = textArea.selectionStart;
        //var selectionEnd = textArea.selectionEnd;

        //var statementParser = new StatementParser(value);
        //return statementParser.getStatementUnderCaret(selectionStart, selectionEnd);
        return this.editor.getValue();
    },

    setValue: function(value) {
        this.editor.setValue(value);
    }

});
