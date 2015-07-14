var _ = require("lodash");
var StatementTokenizer = require("./StatementTokenizer");

var StatementParser = module.exports = function StatementParser(input) {
    this.input = input;
};

StatementParser.prototype = {
    getStatements: function() {
        var tokenizer = StatementTokenizer(this.input);
        return tokenizer.getStatements();
    },

    getStatementUnderCaret: function(selectionStart, selectionEnd) {
        var value = this.input;
        if (selectionStart != selectionEnd) {
            return value.substring(selectionStart, selectionEnd);
        } else {
            var tokenizer = StatementTokenizer(value);
            var statements = tokenizer.getStatements();

            var statementObject = null;
            _.find(statements, function(q) {
                if (q.start > selectionStart) {
                    return true;
                } else {
                    statementObject = q;
                }
            });

            return statementObject ? statementObject.statement : "";
        }
    },

    getStatementAtPosition: function(line, ch) {
        var value = this.input;
        var caret = convertToCaret(value, line, ch);
        return this.getStatementUnderCaret(caret, caret);
    }
};

function convertToCaret(value, line, ch) {
    var lines = value.split("\n");
    var position = 0;
    for (var i = 0; i <= line; i++) {
        if (i === line) {
            return position + ch;
        } else {
            position += lines[i].length + 1; // The +1 accounts for the \n removed from the split
        }
    }
}

/*
function oldAlgorithm(value, selectionStart, selectionEnd) {
    if (selectionStart != selectionEnd) {
        return value.substring(selectionStart, selectionEnd);
    } else {
        var startSubstring = 0;
        while (true) {
            var indexOfSemicolon = value.indexOf(";", startSubstring);
            if (indexOfSemicolon === -1) {
                return value.substring(startSubstring, value.length);
            } else if (indexOfSemicolon < selectionStart) {
                startSubstring = indexOfSemicolon + 1;
            } else {
                return value.substring(startSubstring, indexOfSemicolon + 1);
            }
        }
    }
};
*/
