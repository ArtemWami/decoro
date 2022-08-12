const { body, param } = require('express-validator');
const { CompanyImage } = require('../../../models');
const { validateImage } = require('../../helpers/validators');

const validateCreateCompanyImageRequest = () => [
    param('companyId').isUUID(4),
    body('type').isString().isIn(CompanyImage.TYPES),
    body('image').custom(validateImage()),
];

const validateDeleteCompanyImageRequest = () => [
    param('companyId').isUUID(4),
    param('imageId').isUUID(4),
];

module.exports = {
    validateCreateCompanyImageRequest,
    validateDeleteCompanyImageRequest,
};
