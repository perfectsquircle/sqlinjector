var $ = require("domtastic");

var SchemaView = module.exports = function($el) {
    $el.find(".schema,.relation-type").on("click", this.handleSchemaClick.bind(this));
    $el.find(".relation").on("click", this.handleRelationClick.bind(this));
};

SchemaView.prototype = {
    handleSchemaClick: function(e) {
        e.preventDefault();
        $($(e.currentTarget).attr("href")).toggleClass("collapsed");
    },

    handleRelationClick: function(e) {
        e.preventDefault();
    }
};
