const { body } = require('express-validator');

const validateCreatePaletteRequest = () => [
    body('buildingId').isUUID(4),
    body('name').isString().isLength({ min: 0, max: 50 }),
    body('description').isString().isLength({ min: 0, max: 1000 }),
];

module.exports = {
    validateCreatePaletteRequest,
};
