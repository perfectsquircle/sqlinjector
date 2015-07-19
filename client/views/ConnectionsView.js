var $ = require("domtastic");
var util = require("util");
var Sortable = require("sortablejs");

var ConnectionsView = module.exports = function($el) {
    var sortable = Sortable.create($el[0], {
        draggable: ".connection",
        animation: 100,
        store: {
            get: function() {
                return [];
            },
            set: function(sortable) {
                var order = sortable.toArray();
                console.debug(order);

                fetch("/sort/connections", {
                    credentials: "same-origin",
                    method: "post",
                    headers: {
                        "Accept": "application/json",
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(order)
                }).then(function(response) {
                    return response.json();
                }).then(function(text) {
                    console.log(text);
                });
            }
        }
    });
};

ConnectionsView.prototype = {
    handleSortableOnEnd: function(e) {

    }
};
