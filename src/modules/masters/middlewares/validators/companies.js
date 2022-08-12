const { body, param } = require('express-validator');
const { Company } = require('../../../../../models');
const { ifExists, ifNotEmpty} = require('../../../../middlewares/validators/common');

const validateCreateCompanyRequest = () => [
    body('companyName').isString().isLength({ max: 60 }),
    body('subdomainName').isString().isLength({ max: 60 }),
    body('address').isString().isLength({ max: 100 }),
    body('city').isString().isLength({ max: 100 }),
    body('province').isString().isLength({ max: 100 }),
    body('postalCode').isString().isLength({ max: 15 }),
    body('country').isString().isLength({ max: 100 }),
    body('phone').isString().isLength({ min: 5, max: 20 }).optional({ nullable: true }),
    body('email').isString().isEmail().optional({ nullable: true }),
    body('adminEmail').isString().isEmail(),
];

const validateUpdateCompanyRequest = () => [
    param('companyId').isString().isUUID(4),
    ifExists('companyName').isString().isLength({ max: 60 }),
    ifExists('address').isString().isLength({ max: 100 }),
    ifExists('city').isString().isLength({ max: 100 }),
    ifExists('province').isString().isLength({ max: 100 }),
    ifExists('postalCode').isString().isLength({ max: 15 }),
    ifExists('country').isString().isLength({ max: 100 }),
    ifExists('phone').isString().isLength({ min: 5, max: 20 }).optional({ nullable: true }),
    ifExists('email').isString().isEmail().optional({ nullable: true }),
    ifExists('adminEmail').isString().isEmail(),
    ifExists('status').isString().isIn(Company.STATUSES),
    ifNotEmpty('primaryColor').isString().isLength({ min: 6, max: 6 }),
    ifNotEmpty('textColor').isString().isLength({ min: 6, max: 6 }),
];

const validateFindOneCompanyRequest = () => [param('companyId').isString().isUUID(4)];
const validateDeleteCompanyRequest = () => [param('companyId').isString().isUUID(4)];

module.exports = {
    validateCreateCompanyRequest,
    validateUpdateCompanyRequest,
    validateFindOneCompanyRequest,
    validateDeleteCompanyRequest,
};
