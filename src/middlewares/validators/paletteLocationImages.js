const { body, param } = require('express-validator');
const { PaletteLocationImage } = require('../../../models');
const { validateImage } = require('../../helpers/validators');

const validateCreatePaletteLocationImageRequest = () => [
    param('paletteLocationId').isUUID(4),
    body('type').isString().isIn(PaletteLocationImage.TYPES),
    body('image').custom(validateImage()),
];

const validateDeletePaletteLocationImageRequest = () => [
    param('paletteLocationId').isUUID(4),
    param('imageId').isUUID(4),
];

module.exports = {
    validateCreatePaletteLocationImageRequest,
    validateDeletePaletteLocationImageRequest,
};
