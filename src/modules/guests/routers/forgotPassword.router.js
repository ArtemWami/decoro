const { Router } = require('express');
const { wrap } = require('../../../base/controller');
const forgotPasswordController = require('../controllers/forgotPassword.controller');
const { validationResponse } = require('../../../middlewares/validators/common');
const {
    validateForgotPasswordRequest,
    validateSetPasswordRequest,
} = require('../../../middlewares/validators/auth');

const router = Router();

router.post(
    '/',
    validateForgotPasswordRequest(),
    validationResponse,
    wrap(forgotPasswordController.forgotPassword)
);

router.post(
    '/set',
    validateSetPasswordRequest(),
    validationResponse,
    wrap(forgotPasswordController.setPassword)
);

module.exports = router;
