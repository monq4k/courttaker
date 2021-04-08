const EXPRESS = require('express');
const APP = EXPRESS();
const MORGAN = require("morgan");
const BODY_PARSER = require("body-parser");

//routes
const USER_ROUTES = require('./api/routes/user');
const COMPANY_ROUTES = require('./api/routes/company');
const COMPANY_ROOM_ROUTES = require('./api/routes/companyRoom');
const COMPANY_ROOM_CONTRACTS_ROUTES = require('./api/routes/companyRoomContract');
const ANALYSIS_ROUTES = require('./api/routes/analysis');

APP.use(MORGAN("dev"));
APP.use(BODY_PARSER.urlencoded({ extended: false }));
APP.use(BODY_PARSER.json());

//access headers
APP.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    if (req.method === "OPTIONS") {
        res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
        return res.status(200).json({});
    }
    next();
});

//start page route
APP.get('/', (request, response) => {
    response.json({
      message: "Welcome home"
    });
  });

//links build
require("./api/database/links")();

//Using routes which should handle requests
APP.use("/user", USER_ROUTES);
APP.use("/company", COMPANY_ROUTES);
APP.use("/companyRoom", COMPANY_ROOM_ROUTES);
APP.use("/companyRoomContract", COMPANY_ROOM_CONTRACTS_ROUTES);
APP.use("/analysis", ANALYSIS_ROUTES);

APP.use((req, res, next) => {
    const ERROR = new Error("Not found");
    ERROR.status = 404;
    next(ERROR);
});

APP.use((error, req, res, next) => {
    res.status(error.status || 500).json({
        err: error
    });
});

module.exports = APP;