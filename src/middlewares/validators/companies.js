const { body } = require('express-validator');
const { ifNotEmpty } = require('./common');

const validateUpdateCompanyRequest = () => [
    body('companyName').isString().isLength({ max: 60 }),
    body('address').isString().isLength({ max: 100 }),
    body('city').isString().isLength({ max: 100 }),
    body('province').isString().isLength({ max: 100 }),
    body('postalCode').isString().isLength({ max: 15 }),
    body('country').isString().isLength({ max: 100 }),
    ifNotEmpty('phone').isString().isLength({ min: 5, max: 20 }),
    body('email').isString().isEmail().optional({ nullable: true }),
];

module.exports = {
    validateUpdateCompanyRequest,
};
