var $ = require("domtastic");
var util = require("util");

var ConnectionEditView = module.exports = function($el) {
    this.$el = $el;
    this.nameInput = $el.find("#name");
    this.usernameInput = $el.find("#username");
    this.hostnameInput = $el.find("#hostname");
    this.databaseInput = $el.find("#database");
    this.saveButton = $el.find(".save-button");

    $el.on("input", "#username,#hostname,#database", this.handleInput.bind(this));
    $el.on("submit", "#delete-form", this.handleDeleteFormSubmit.bind(this));
    $el.on("submit", "#connection-form", this.handleConnectionFormSubmit.bind(this));
};

ConnectionEditView.prototype = {
    handleInput: function(e) {
        var placeholder = util.format("%s@%s/%s",
            this.getUsername(),
            this.getHostname(),
            this.getDatabase()
        );
        this.nameInput.attr("placeholder", placeholder);
    },

    getUsername: function() {
        return this.usernameInput.val();
    },

    getHostname: function() {
        return this.hostnameInput.val();
    },

    getDatabase: function() {
        return this.databaseInput.val();
    },

    handleDeleteFormSubmit: function(e) {
        if (window.confirm("Are you sure you want to delete this connection?")) {
            return true;
        } else {
            e.preventDefault();
            return false;
        }
    },

    handleConnectionFormSubmit: function(e) {
        if (this.connectionFormSubmitted) {
            e.preventDefault();
            return false;
        }
        this.connectionFormSubmitted = true;
        this.saveButton.prop("disabled", true);
    }
};
