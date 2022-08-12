const { Router } = require('express');
const { wrap } = require('../../../base/controller');
const authController = require('../controllers/auth.controller');
const { validateLoginRequest } = require('../../../middlewares/validators/auth');
const { validationResponse } = require('../../../middlewares/validators/common');

const router = Router();

router.post('/', validateLoginRequest(), validationResponse, wrap(authController.login));

module.exports = router;
