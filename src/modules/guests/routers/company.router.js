const { Router } = require('express');
const { wrap } = require('../../../base/controller');
const companyController = require('../controllers/company.controller');

const router = Router();

router.get('/branding', wrap(companyController.getBranding));

module.exports = router;
