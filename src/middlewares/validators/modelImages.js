const { body, param } = require('express-validator');
const { ModelImage } = require('../../../models');
const { validateImage } = require('../../helpers/validators');

const validateCreateModelImageRequest = () => [
    param('modelId').isUUID(4),
    body('type').isString().isIn(ModelImage.TYPES),
    body('image').custom(validateImage()),
];

const validateDeleteModelImageRequest = () => [
    param('modelId').isUUID(4),
    param('imageId').isUUID(4),
];

module.exports = {
    validateCreateModelImageRequest,
    validateDeleteModelImageRequest,
};
