var config = require("./config");
var express = require("express");
var path = require("path");

var app = express();

app.set('view engine', 'jade');
app.set('views', __dirname + '/views');
app.use(express.static(path.join(__dirname, "public"), { maxAge: config.staticAssetMaxAge }));
app.use("/vendor", express.static(path.join(__dirname, "bower_components"), { maxAge: config.staticAssetMaxAge }));

var indexController = require("./routes/indexController");
app.get("/", indexController.root);

app.listen(3001, function() {
	console.log("Express server listening on port 3001");
});