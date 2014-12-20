var config = require("./config");
var express = require("express");
var bodyParser = require("body-parser");
var session = require("cookie-session");
var path = require("path");
var logger = require("./lib/logger");

var app = express();

app.set('view engine', 'jade');
app.set('views', __dirname + '/views');
app.use(express.static(path.join(__dirname, "public"), {
    maxAge: config.staticAssetMaxAge
}));
app.use("/vendor", express.static(path.join(__dirname, "bower_components"), {
    maxAge: config.staticAssetMaxAge
}));
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(session({
    secret: "C18A49CE-58B2-4B1B-82C1-E3883AA624E0"
}));

var indexController = require("./routes/indexController");
var authController = require("./routes/authController");
var consoleController = require("./routes/consoleController");
var adminController = require("./routes/adminController");
var connectionController = require("./routes/connectionController");
var schemaController = require("./routes/schemaController");

app.get("/login", authController.getLogin);
app.post("/login", authController.postLogin);

if (app.get("env") === "development") {
    // fake routes:
    app.get("/console", consoleController.getConsole);
    app.post("/console", consoleController.postConsole);
}

app.use(authController.authMiddleware);

app.get("/", indexController.root);
app.get("/connections", connectionController.getConnections);
app.get("/connection/:connectionId/console", consoleController.getConnectionConsole);
app.get("/connection/:connectionId/schema", schemaController.getConnectionSchema);
app.get("/admin", adminController.getAdminPage);

app.listen(3001, function() {
    logger.info("Express server listening on port 3001 in %s mode", app.get("env"));
});
