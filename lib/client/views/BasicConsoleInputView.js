var $ = require("domtastic");

var BasicConsoleInputView = module.exports = function($el, submit) {
    this.$el = $el;
    this.$el.on("keydown", this.handleKeydown.bind(this));
    //this.$el.on("input", this.handleInput.bind(this));
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
        var textArea = this.$el[0];
        var value = textArea.value;

        var selectionStart = textArea.selectionStart;
        var selectionEnd = textArea.selectionEnd;
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
                    return value.substring(startSubstring, indexOfSemicolon);
                }
            }
        }
    }

};
