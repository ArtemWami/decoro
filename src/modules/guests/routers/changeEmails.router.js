const { Router } = require('express');
const { wrap } = require('../../../base/controller');
const changeEmailsController = require('../controllers/changeEmails');
const { validationResponse } = require('../../../middlewares/validators/common');
const {
    validateConfirmEmailChangeRequest,
    validateCancelEmailChangeRequest,
} = require('../../../middlewares/validators/verification');

const router = Router();

router.post(
    '/confirmation',
    validateConfirmEmailChangeRequest(),
    validationResponse,
    wrap(changeEmailsController.confirm)
);

router.post(
    '/cancel',
    validateCancelEmailChangeRequest(),
    validationResponse,
    wrap(changeEmailsController.cancel)
);

module.exports = router;
