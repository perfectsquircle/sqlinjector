var fs = require("fs");
var path = require("path");
var StatementParser = require("../../../lib/parser/StatementParser");

exports.testExtractQuery1 = function(test) {
    var input = fs.readFileSync(path.join(__dirname, "./twoQueries.sql"), "utf-8");
    var q1 = "select\n  *\nfrom yourFace yf\n  join myFoot mf on mf.toe = yf.nose;";
    var q2 = "select\n  *\nfrom fruit\nwhere fruit.name = \'apple\';";

    var statementParser = new StatementParser(input);

    var statement = statementParser.getStatementUnderCaret(0, 0);
    test.equals(statement, q1);

    statement = statementParser.getStatementUnderCaret(7, 7);
    test.equals(statement, q1);

    statement = statementParser.getStatementUnderCaret(65, 65);
    test.equals(statement, q1);

    statement = statementParser.getStatementUnderCaret(100, 100);
    test.equals(statement, q2);

    statement = statementParser.getStatementUnderCaret(input.length, input.length);
    test.equals(statement, q2);

    test.done();
};
