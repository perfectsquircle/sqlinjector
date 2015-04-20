var $ = require("domtastic");

var SchemaView = module.exports = function($el, relationSelected) {
    $el.find(".schema,.relation-type").on("click", this.handleSchemaClick.bind(this));
    $el.find(".relation").on("click", this.handleRelationClick.bind(this));
    this.relationSelected = relationSelected;
};

SchemaView.prototype = {
    handleSchemaClick: function(e) {
        e.preventDefault();
        $($(e.currentTarget).attr("rel")).toggleClass("collapsed");
    },

    handleRelationClick: function(e) {
        e.preventDefault();
        this.relationSelected(e.currentTarget.dataset.schema, e.currentTarget.dataset.relation, e.currentTarget.dataset.relationType);
    }
};
