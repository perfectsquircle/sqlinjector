module.exports = function(text) {
    text = text || "";
    text = text.replace(/\W+/g, "-");
    return text;
};
