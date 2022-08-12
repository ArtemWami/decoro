const { param, body } = require('express-validator');
const { EmailTemplate } = require('../../../models');

const linkedEmailIds = [
    EmailTemplate.EMAIL_ID.BEGINNING_OF_CAMPAIGN,
    EmailTemplate.EMAIL_ID.T7_DAYS_AFTER_BEGINNING_OF_CAMPAIGN,
    EmailTemplate.EMAIL_ID.T14_DAYS_AFTER_BEGINNING_OF_CAMPAIGN,
    EmailTemplate.EMAIL_ID.T21_DAYS_AFTER_BEGINNING_OF_CAMPAIGN,
];

const validateFindOneEmailTemplateRequest = () => [param('emailTemplateId').isUUID(4)];
const validateDeleteEmailTemplateRequest = () => [param('emailTemplateId').isUUID(4)];

const validateUpdateEmailTemplateRequest = () => [
    param('emailTemplateId').isUUID(4),
    body('name').isString().isLength({ max: 60 }).optional(),
    body('from').isString().isLength({ max: 60 }).optional(),
    body('subject').isString().isLength({ max: 100 }).optional(),
    body('isEnabled').isBoolean().optional(),
    body('daysDelay').isInt({ min: 1, max: 365 }).optional({ nullable: true }),
    body('template').isString().isLength({ max: 10000 }).optional(),
    body('parentEmailTemplateId')
        .if(param('emailTemplateId').not().isIn(EmailTemplate.EMAIL_IDS))
        .isUUID(4)
        .isIn(EmailTemplate.EMAIL_IDS),
    body('template')
        .if(body('template').exists())
        .if(param('emailTemplateId').isIn(linkedEmailIds))
        .contains('{{Invitation link}}')
        .withMessage('{{Invitation link}} is required'),
    body('template')
        .if(body('template').exists())
        .if(body('parentEmailTemplateId').isIn(linkedEmailIds))
        .contains('{{Invitation link}}')
        .withMessage('{{Invitation link}} is required'),
];

const validateSendEmailTemplateRequest = () => [
    param('emailTemplateId').isUUID(4),
    body('email').isEmail(),
];

module.exports = {
    validateFindOneEmailTemplateRequest,
    validateUpdateEmailTemplateRequest,
    validateDeleteEmailTemplateRequest,
    validateSendEmailTemplateRequest,
};
