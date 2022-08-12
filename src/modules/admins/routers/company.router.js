const { Router } = require('express');
const { wrap } = require('../../../base/controller');
const companyController = require('../controllers/company.controller');
const { validateUpdateCompanyRequest } = require('../../../middlewares/validators/companies');
const { validationResponse } = require('../../../middlewares/validators/common');

const router = Router();

router.patch(
    '/',
    validateUpdateCompanyRequest(),
    validationResponse,
    wrap(companyController.updateCompany)
);

module.exports = router;
