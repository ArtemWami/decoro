const { param, body } = require('express-validator');
const { EmailTemplateImage } = require('../../../models');
const { validateImage } = require('../../helpers/validators');

const validateCreateEmailTemplateImageRequest = () => [
    param('emailTemplateId').isUUID(4),
    body('type').isString().isIn(EmailTemplateImage.TYPES),
    body('image').custom(validateImage()),
];

module.exports = {
    validateCreateEmailTemplateImageRequest,
}