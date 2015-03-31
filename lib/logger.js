var winston = require("winston");

var transports = [];

if (process.env.NODE_ENV === "production") {
    transports.push(new winston.transports.File({
        filename: 'sqlinjector.log',
        level: "info"
    }));
} else {
    transports.push(new winston.transports.Console({
        level: "debug"
    }));
}

module.exports = new winston.Logger({
    transports: transports
});
