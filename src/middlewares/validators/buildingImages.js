const { body, param } = require('express-validator');
const { BuildingImage } = require('../../../models');
const { validateImage } = require('../../helpers/validators');

const validateCreateBuildingImageRequest = () => [
    param('buildingId').isUUID(4),
    body('type').isString().isIn(BuildingImage.TYPES),
    body('image').custom(validateImage()),
];

const validateDeleteBuildingImageRequest = () => [
    param('buildingId').isUUID(4),
    param('imageId').isUUID(4),
];

module.exports = {
    validateCreateBuildingImageRequest,
    validateDeleteBuildingImageRequest,
};
