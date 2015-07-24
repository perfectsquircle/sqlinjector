var $ = require("domtastic");
var _ = require("lodash");
var store = require("../lib/store");

var ParametersView = module.exports = function($el) {
    _.bindAll(this);
    this.$el = $el;
    this.$el.on("input", ".param", _.debounce(this.handleInput, 50, this));
    this.$el.find(".clear-button").on("click", this.handleClearButtonClick);
    this.paramsEl = this.$el.find(".params");

    this.storeKey = "params-" + App.connectionId;
    var params = store.get(this.storeKey);
    if (_.isArray(params)) {
        this.setParams(params);
    }
};

ParametersView.prototype = Object.create({
    handleInput: function(e) {
        var input = $(e.target);
        var paramElements = this.getParamElements();

        for (var i = paramElements.length - 1; i >= 0; i--) {
            var param = paramElements[i];
            if (!param.value.length) {
                $(param).parent().remove();
            } else {
                break;
            }
        }

        this.saveParams();

        this.paramsEl.append(this.paramTemplate());
        if (document.activeElement && !document.activeElement.classList.contains("param")) {
            _.last(this.getParamElements()).focus();
        }
    },

    getParams: function() {
        return _.chain(this.getParamElements()).map(function(param) {
            return param.value;
        }).dropRightWhile(function(param) {
            return !param.length;
        }).value();
    },

    setParams: function(params) {
        var paramEls = [];
        _.each(params, function(paramString) {
            paramEls.push(this.paramTemplate(paramString));
        }, this);
        paramEls.push(this.paramTemplate());
        this.paramsEl.html(paramEls.join(""));
    },

    getParamElements: function() {
        return this.$el.find(".param");
    },

    handleClearButtonClick: function(e) {
        this.paramsEl.html(this.paramTemplate());
        this.saveParams();
    },

    saveParams: function() {
        store.put(this.storeKey, this.getParams());
    },

    paramTemplate: function(value) {
        value = value || "";
        return "<li><input class='param mono' type='text' name='param' value='" + value + "' /></li>";
    }
});
