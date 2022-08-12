const { query } = require('express-validator');

const validatePaginationParams = () => [
    query('limit').isInt({ min: 0, max: 10000 }).optional({ nullable: true }),
    query('offset').isInt({ min: 0, max: 10000 }).optional({ nullable: true }),
];

module.exports = {
    validatePaginationParams
};
