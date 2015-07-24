exports.get = function get(key) {
    return JSON.parse(localStorage.getItem(key));
};

exports.put = function put(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
};
