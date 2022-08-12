const jwt = require('jsonwebtoken');

const { JWT_KEY, ACCESS_TOKEN_EXP } = process.env;

const sign = (
    { userId, email, role, subdomain },
    key = JWT_KEY,
    options = { expiresIn: ACCESS_TOKEN_EXP }
) => jwt.sign({ userId, email, role, subdomain }, key, options);

module.exports = sign;
