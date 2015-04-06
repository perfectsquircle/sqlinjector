module.exports = function InputStream(input) {
    var position = 0;
    return {
        next: next,
        peek: peek,
        eof: eof
    };

    function next() {
        var character = input.charAt(position++);
        return {
            character: character,
            position: position - 1
        };
    }

    function peek() {
        return {
            character: input.charAt(position),
            position: position
        };
    }

    function eof() {
        return peek().character === "";
    }
};
