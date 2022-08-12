const jwt = require('jsonwebtoken');

const { JWT_KEY } = process.env;

const verify = (token, key = JWT_KEY) => jwt.verify(token, key);

module.exports = verify;
