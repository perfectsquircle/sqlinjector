
exports.up = function(knex, Promise) {
  return knex("DatabaseType").insert({ databaseType: "mssql" });
};

exports.down = function(knex, Promise) {
  return knex("DatabaseType").where({ databaseType: "mssql" }).del();
};
