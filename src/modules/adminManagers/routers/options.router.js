const { Router } = require('express');
const { wrap } = require('../../../base/controller');
const optionsController = require('../../admins/controllers/options.controller');
const { getRequestBody, getRequestQuery, getRequestParam } = require('../../../helpers/middleware');
const {
    checkBuildingPermission,
    checkOptionPermission,
} = require('../../../middlewares/companyPermissions');

const router = Router();

/** BASE OPTION CREATION */
router.post(
    '/',
    checkBuildingPermission(getRequestBody('buildingId')),
    wrap(optionsController.createOptions)
);

router.get(
    '/',
    checkBuildingPermission(getRequestQuery('buildingId')),
    wrap(optionsController.getAllOptions)
);

router.get(
    '/:optionsId',
    checkOptionPermission(getRequestParam('optionsId')),
    wrap(optionsController.getOneOption)
);

router.patch(
    '/:optionsId',
    checkOptionPermission(getRequestParam('optionsId')),
    wrap(optionsController.updateOptions)
);

router.delete(
    '/:optionsId',
    checkOptionPermission(getRequestParam('optionsId')),
    wrap(optionsController.removeOptions)
);

module.exports = router;
