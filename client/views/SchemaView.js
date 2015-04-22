var $ = require("domtastic");

var SchemaView = module.exports = function($el, relationSelected) {
    this.$el = $el;
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
        var target = e.currentTarget;
        this.$el.find(".relation").removeClass("selected");
        $(target).addClass("selected");
        this.relationSelected(target.dataset.schema, target.dataset.relation, target.dataset.kind);
    }
};
