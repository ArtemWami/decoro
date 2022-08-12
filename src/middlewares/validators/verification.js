const { body } = require('express-validator');
const { User } = require('../../../models');

const validateConfirmEmailChangeRequest = () => [
    body('confirmationKey').isString().isLength({ max: 127 }),
    body('audience').isString().isIn(User.AUDIENCE),
];

const validateCancelEmailChangeRequest = () => [
    body('cancelKey').isString().isLength({ max: 127 }),
    body('audience').isString().isIn(User.AUDIENCE),
];

module.exports = {
    validateConfirmEmailChangeRequest,
    validateCancelEmailChangeRequest,
};
