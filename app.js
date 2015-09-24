var pkg = require("./package.json");
var config = require("./config");
var express = require("express");
var bodyParser = require("body-parser");
var session = require("cookie-session");
var path = require("path");
var logger = require("./lib/logger");
var compression = require("compression");
var browserify = require('browserify-middleware');
var util = require("util");
var _ = require("lodash");
var slug = require("./lib/slug");

var app = express();

app.set("view engine", "jade");
app.set("views", path.join(__dirname, "/views"));
app.locals.pretty = config.prettyHtml;
app.use(compression());
app.use(express.static(path.join(__dirname, "public"), {
    maxAge: config.staticAssetMaxAge
}));
app.use("/module", express.static(path.join(__dirname, "node_modules"), {
    maxAge: config.staticAssetMaxAge
}));
app.use("/vendor", express.static(path.join(__dirname, "bower_components"), {
    maxAge: config.staticAssetMaxAge
}));
app.use("/js", browserify("./client", {
    transform: ["jadeify"]
}));
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
app.use(session({
    secret: config.sessionSecret
}));
app.use(function(req, res, next) {
    res.locals.util = util;
    res.locals._ = _;
    res.locals.config = config;
    res.locals.slug = slug;
    res.locals.appVersion = slug(pkg.version);
    return next();
});

var authController = require("./routes/authController");
var consoleController = require("./routes/consoleController");
var adminController = require("./routes/adminController");
var connectionController = require("./routes/connectionController");
var schemaController = require("./routes/schemaController");
var errorController = require("./routes/errorController");

app.get("/login", authController.getLogin);
app.post("/login", authController.postLogin);
app.get("/logout", authController.getLogout);
app.get("/register", authController.getRegister);
app.post("/register", authController.postRegister);

app.use(authController.authMiddleware);

app.get("/", connectionController.getConnections);
app.post("/sort/connections", connectionController.sortConnectionsPost);
app.get("/create", connectionController.createConnection);
app.post("/create", connectionController.createConnectionPost);
app.get("/edit/:connectionId/:connectionName?", connectionController.connectionMiddleware, connectionController.editConnection);
app.post("/edit/:connectionId/:connectionName?", connectionController.connectionMiddleware, connectionController.editConnectionPost);
app.post("/delete/:connectionId", connectionController.connectionMiddleware, connectionController.editConnectionDelete);

app.get("/console/:connectionId/:connectionName?", connectionController.connectionMiddleware, consoleController.getConnectionConsole);
app.post("/console/:connectionId/:connectionName?", connectionController.connectionMiddleware, consoleController.postConsoleSessionQuery);

app.get("/schema/:connectionId/:connectionName?", connectionController.connectionMiddleware, schemaController.getConnectionSchema);
app.get("/relation/:connectionId/:connectionName?", connectionController.connectionMiddleware, schemaController.getRelationInformation);

app.get("/admin", adminController.getAdminPage);

app.all("*", errorController.notFound);
app.use(errorController.errorHandler);

app.listen(3001, function() {
    logger.info("Express server listening on port 3001 in %s mode", app.get("env"));
});

module.exports = app;
