function get(key) {
    return JSON.parse(localStorage.getItem(key));
}

function put(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
}


module.exports = {
    getConsoleInput: function(key) {
        return get(key);
    },

    saveConsoleInput: function(key, obj) {
        put(key, obj);
    }
};
