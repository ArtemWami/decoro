const { body } = require('express-validator');
const { User } = require('../../../models');

const validateLoginRequest = () => [
    body('login').isString().isEmail(),
    body('password').isString().isLength({ min: 8 }),
    body('audience').isString().isIn(User.AUDIENCE),
];

const validateForgotPasswordRequest = () => [
    body('email').isString().isEmail(),
    body('audience').isString().isIn(User.AUDIENCE),
];

const validateSetPasswordRequest = () => [
    body('forgotPasswordKey').isString().isLength({ max: 127 }),
    body('password').isString().isLength({ min: 8 }),
    body('audience').isString().isIn(User.AUDIENCE),
];

module.exports = {
    validateLoginRequest,
    validateForgotPasswordRequest,
    validateSetPasswordRequest,
};
