const EXPRESS = require('express');
const APP = EXPRESS();
const MORGAN = require('morgan');
const BODY_PARSER = require('body-parser');

//routes
const USER_ROUTES = require('./api/routes/user');
const COURT_OWNER_ROUTES = require('./api/routes/courtOwner');
const COURT_ROUTES = require('./api/routes/court');
const USER_COURT_ROUTES = require('./api/routes/userCourt');
const HOOP_ROUTES = require('./api/routes/hoop');
const TEAM_ROUTES = require('./api/routes/team');

APP.use(MORGAN('dev'));
APP.use(BODY_PARSER.urlencoded({ extended: false }));
APP.use(BODY_PARSER.json());

//access headers
APP.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  );
  if (req.method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
    return res.status(200).json({});
  }
  next();
});

//start page route
APP.get('/', (request, response) => {
  response.json({
    message: 'Welcome home',
  });
});

//links build
require('./api/database/links')();

//Using routes which should handle requests
APP.use('/user', USER_ROUTES);
APP.use('/courtOwner', COURT_OWNER_ROUTES);
APP.use('/court', COURT_ROUTES);
APP.use('/userCourt', USER_COURT_ROUTES);
APP.use('/hoop', HOOP_ROUTES);
APP.use('/team', TEAM_ROUTES);

APP.use((req, res, next) => {
  const ERROR = new Error('Not found');
  ERROR.status = 404;
  next(ERROR);
});

APP.use((error, req, res, next) => {
  res.status(error.status || 500).json({
    err: error,
  });
});

module.exports = APP;
