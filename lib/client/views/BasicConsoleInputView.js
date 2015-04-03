var $ = require("domtastic");

var BasicConsoleInputView = module.exports = function($el) {
    this.$el = $el;
    this.form = $($el[0].form);
    //this.$el.on("keydown", this.handleKeydown.bind(this));
    this.$el.on("input", this.handleInput.bind(this));
};

BasicConsoleInputView.prototype = {

    handleKeydown: function(e) {
        console.debug(e);
        switch (e.keyCode) {
            case 13:
                {
                    if (e.ctrlKey || e.metaKey) {
                        e.preventDefault();
                        this.form.trigger("submit");
                    }
                    break;
                }
        }
    },

    handleInput: function(e) {
        //console.debug(e);
    },

    getValue: function() {
        return this.$el.val();
    }

};
