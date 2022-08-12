const { param } = require('express-validator');

const validateGetUnitRequest = () => [
    param('unitId').isUUID(4),
];

module.exports = {
    validateGetUnitRequest
};
