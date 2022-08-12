const { query, body } = require('express-validator');
const { User } = require('../../../models');

const validateInvitationInfoRequest = () => [
    query('invitationKey').isString().isLength({ max: 127 }),
    query('audience').isString().isIn(User.AUDIENCE),
];

const validateVerifyInvitationRequest = () => [
    body('invitationKey').isString().isLength({ max: 127 }),
    body('audience').isString().isIn(User.AUDIENCE),
    body('firstName').isString().isLength({ max: 40 }),
    body('lastName').isString().isLength({ max: 40 }),
    body('password').isString().isLength({ min: 8 }),
];

module.exports = {
    validateInvitationInfoRequest,
    validateVerifyInvitationRequest,
};
