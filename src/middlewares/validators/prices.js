const { body, param } = require('express-validator');
const { Units } = require('../../../models');

const validateCreatePriceRequest = () => [
    body('finishTypeId').isUUID(4),
    body('contractorPrice').isFloat({ min: 0 }).optional({ nullable: true }),
    body('lowerLevelUnitsPrice').isFloat({ min: 0 }).optional({ nullable: true }),
    body('lowerPenthousesPrice').isFloat({ min: 0 }).optional({ nullable: true }),
    body('upperPenthousesPrice').isFloat({ min: 0 }).optional({ nullable: true }),
    body('townhousesPrice').isFloat({ min: 0 }).optional({ nullable: true }),
    body('modelIds').isArray(),
    body('modelIds.*').isUUID(4),
    body('unitTypes').isArray(),
    body('unitTypes.*').isString().isIn(Units.TYPES),
];

const validateUpdatePriceRequest = () => [
    param('priceId').isUUID(4),
    body('contractorPrice').isFloat({ min: 0 }).optional({ nullable: true }),
    body('lowerLevelUnitsPrice').isFloat({ min: 0 }).optional({ nullable: true }),
    body('lowerPenthousesPrice').isFloat({ min: 0 }).optional({ nullable: true }),
    body('upperPenthousesPrice').isFloat({ min: 0 }).optional({ nullable: true }),
    body('townhousesPrice').isFloat({ min: 0 }).optional({ nullable: true }),
    body('modelIds').isArray(),
    body('modelIds.*').isUUID(4),
    body('unitTypes').isArray(),
    body('unitTypes.*').isString().isIn(Units.TYPES),
];

const validateDeletePriceRequest = () => [param('priceId').isUUID(4)];

module.exports = {
    validateCreatePriceRequest,
    validateUpdatePriceRequest,
    validateDeletePriceRequest,
};
