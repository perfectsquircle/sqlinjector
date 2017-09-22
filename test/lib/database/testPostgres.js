// var PostgresDatabaseClient = require("../../../lib/database/dialects/pg/PostgresDatabaseClient");

// var client;

// module.exports = {
//     setUp: function(done) {
//         client = new PostgresDatabaseClient({
//             rowLimit: 10000
//         }, {
//             host: "localhost",

//             user: "postgres",
//             password: "postgres",
//             database: "dvdrental",
//             port: 5432
//         });
//         done();
//     },

//     tearDown: function(done) {
//         client.close();
//         done();
//     },

//     testSelect: function(test) {
//         test.ok(client);
//         client.raw("select * from film;").then(function(result) {
//             test.ok(result);
//             test.equals(result.rows.length, 1000);
//         }).catch(function(e) {
//             if (e.code === "ECONNREFUSED") {
//                 // Postgres server isn't running locally, let's just ignore this for now
//                 test.ok(e);
//             } else {
//                 test.ifError(e);
//             }
//         }).finally(function() {
//             test.done();
//         });
//     },

//     testEmptyStatement: function(test) {
//         test.ok(client);
//         client.raw("").then(function(result) {
//             test.ifError(result);
//         }).catch(function(e) {
//             test.ok(e);
//         }).finally(function() {
//             test.done();
//         });
//     },

//     testEmptyStatement2: function(test) {
//         test.ok(client);
//         client.raw(";").then(function(result) {
//             test.ifError(result);
//         }).catch(function(e) {
//             test.ok(e);
//         }).finally(function() {
//             test.done();
//         });
//     }
// };
