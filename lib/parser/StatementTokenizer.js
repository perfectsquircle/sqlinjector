var InputStream = require("./InputStream");

module.exports = function StatementTokenizer(value) {
    var character, previousCharacter, statement, position;

    return {
        getStatements: getStatements
    };

    function readNext(inputStream) {
        if (inputStream.eof()) {
            return null;
        }
        var characterObject = inputStream.next();
        previousCharacter = character;
        character = characterObject.character;
        position = characterObject.position;
        statement.push(character);
    }

    function readUntil(inputStream, end, prev) {
        while (!inputStream.eof()) {
            readNext(inputStream);
            if (prev && previousCharacter === prev && character === end) {
                break;
            } else if (character === end) {
                break;
            }
        }
    }

    function getStatement(inputStream) {
        var start = null;
        statement = [];
        while (!inputStream.eof()) {
            readNext(inputStream);
            if (start === null) {
                if (!/\s/.test(character)) {
                    start = position;
                } else {
                    statement.pop();
                }
            }
            if (character === "-" && previousCharacter === "-") {
                readUntil(inputStream, "\n");
            } else if (character === "*" && previousCharacter === "/") {
                readUntil(inputStream, "/", "*");
            } else if (character === null || character === ";") {
                return {
                    statement: statement.join(""),
                    start: start,
                    end: position
                };
            }
        }
    }

    function getStatements() {
        position = 0;
        var inputStream = InputStream(value);
        var statements = [];
        while (!inputStream.eof()) {
            var q = getStatement(inputStream);
            if (q !== null) {
                statements.push(q);
            }
        }
        return statements;
    }
};
