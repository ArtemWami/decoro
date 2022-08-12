const { body, param } = require('express-validator');
const { FinishTypePaletteImage } = require('../../../models');
const { validateImage } = require('../../helpers/validators');

const validateCreateFinishTypePaletteImageRequest = () => [
    param('finishTypeId').isUUID(4),
    body('paletteId').isUUID(4),
    body('type').isString().isIn(FinishTypePaletteImage.TYPES),
    body('image').custom(validateImage()),
];

const validateDeleteFinishTypePaletteImageRequest = () => [
    param('finishTypeId').isUUID(4),
    param('imageId').isUUID(4),
    body('paletteId').isUUID(4),
];

module.exports = {
    validateCreateFinishTypePaletteImageRequest,
    validateDeleteFinishTypePaletteImageRequest,
};
