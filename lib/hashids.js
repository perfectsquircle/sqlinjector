var Hashids = require("hashids");
var hashids = new Hashids("i am an sql ninja!");
var _ = require("lodash");

//hashids.encode = _.partialRight(hashids.encode, 13);

module.exports = hashids;
