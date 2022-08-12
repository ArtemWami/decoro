const { Router } = require('express');
const { wrap } = require('../../../base/controller');
const companyController = require('../../admins/controllers/company.controller');

const router = Router();

router.patch('/', wrap(companyController.updateCompany));

module.exports = router;
