const JWT = require('jsonwebtoken');
module.exports = (req, res, next) => {
  const BEARER_HEADER = req.headers['authorization'];

  if (typeof BEARER_HEADER !== 'undefined') {
    //Split the form of token
    const BEARER = BEARER_HEADER.split(' '); // Bearer - {0}, <access_token> - {1}
    const BEARER_TOKEN = BEARER[1];
    req.token = BEARER_TOKEN;
    next();
  } else {
    res.sendStatus(403);
  }
};
