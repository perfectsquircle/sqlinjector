var querystring = require("querystring");

var RelationInformationView = module.exports = function($el) {
    this.$el = $el;
};

RelationInformationView.prototype = {
    handleRelationSelected: function(schema, relation, kind) {
        var self = this;
        var url = "/relation/" + App.connectionId;
        url += "?" + querystring.stringify({
            schema: schema,
            relation: relation,
            kind: kind
        });
        fetch(url, {
            credentials: "same-origin"
        }).then(function(response) {
            return response.text();
        }).then(function(responseHtml) {
            self.handleInformation(responseHtml);
        }).catch(function(e) {
            throw e;
        });
    },

    handleInformation: function(html) {
        this.$el.html(html);
    }
};
