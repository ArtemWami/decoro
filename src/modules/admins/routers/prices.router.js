const { Router } = require('express');
const { wrap } = require('../../../base/controller');
const pricesController = require('../controllers/prices.controller');
const { validationResponse } = require('../../../middlewares/validators/common');
const {
    validateCreatePriceRequest,
    validateUpdatePriceRequest,
    validateDeletePriceRequest,
} = require('../../../middlewares/validators/prices');

const { getRequestBody, getRequestParam } = require('../../../helpers/middleware');
const {
    checkFinishTypePermission,
    checkPricePermission,
} = require('../../../middlewares/companyPermissions');

const router = Router();

router.post(
    '/',
    checkFinishTypePermission(getRequestBody('finishTypeId')),
    validateCreatePriceRequest(),
    validationResponse,
    wrap(pricesController.create)
);

router.patch(
    '/:priceId',
    checkPricePermission(getRequestParam('priceId')),
    validateUpdatePriceRequest(),
    validationResponse,
    wrap(pricesController.update)
);

router.delete(
    '/:priceId',
    checkPricePermission(getRequestParam('priceId')),
    validateDeletePriceRequest(),
    validationResponse,
    wrap(pricesController.destroy)
);

module.exports = router;
