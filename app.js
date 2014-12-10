var config = require("./config");
var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");
var logger = require("./lib/logger");

var app = express();

app.set('view engine', 'jade');
app.set('views', __dirname + '/views');
app.use(express.static(path.join(__dirname, "public"), { maxAge: config.staticAssetMaxAge }));
app.use("/vendor", express.static(path.join(__dirname, "bower_components"), { maxAge: config.staticAssetMaxAge }));
app.use(bodyParser.urlencoded({ extended: true }));

var indexController = require("./routes/indexController");
var consoleController = require("./routes/consoleController");
var adminController = require("./routes/adminController");

app.get("/", indexController.root);
app.get("/console", consoleController.getConsole);
app.post("/console", consoleController.postConsole);

app.get("/admin", adminController.getadminPage);

app.listen(3001, function() {
	logger.info("Express server listening on port 3001");
});