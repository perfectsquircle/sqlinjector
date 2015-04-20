var querystring = require("querystring");

var RelationInformationView = module.exports = function($el) {
    this.$el = $el;
};

RelationInformationView.prototype = {
    handleRelationSelected: function(schema, relation, relationType) {
        var self = this;
        var url = "/connection/" + App.connectionId + "/schema/" + App.consoleSessionKey;
        url += "?" + querystring.stringify({
            schema: schema,
            relation: relation,
            relationType: relationType
        });
        fetch(url).then(function(response) {
            return response.text();
        }).then(function(responseHtml) {
            self.handleInformation(responseHtml);
        }).catch(function(e) {
            console.error(e);
        });
    },

    handleInformation: function(html) {
        this.$el.html(html);
    }
};
