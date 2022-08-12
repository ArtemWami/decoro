const { body, param } = require('express-validator');

const validateCreateFinishTypeRequest = () => [
    body('optionsId').isUUID(4),
    body('name').isString().isLength({ max: 50 }).notEmpty(),
    body('description').isString().isLength({ max: 300 }).optional(),
    body('paletteIds').isArray({ min: 1 }),
    body('paletteIds.*').isUUID(4),
];

const validateUpdateFinishTypeRequest = () => [
    param('finishTypeId').isUUID(4),
    body('name').isString().isLength({ max: 50 }).notEmpty(),
    body('description').isString().isLength({ max: 300 }).optional(),
    body('paletteIds').isArray({ min: 1 }),
    body('paletteIds.*').isUUID(4),
];

const validateDeleteFinishTypeRequest = () => [param('finishTypeId').isUUID(4)];

module.exports = {
    validateCreateFinishTypeRequest,
    validateUpdateFinishTypeRequest,
    validateDeleteFinishTypeRequest,
};
