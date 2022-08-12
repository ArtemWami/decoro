const { Router } = require('express');
const { wrap } = require('../../../base/controller');
const unitsController = require('../../admins/controllers/units.controller');
const ownersController = require('../../admins/controllers/owners.controller');
const { getRequestBody, getRequestQuery, getRequestParam } = require('../../../helpers/middleware');
const {
    checkBuildingPermission,
    checkUnitPermission,
    checkUnitsPermission,
    checkOwnerPermission,
} = require('../middlewares/buildingPermissions');

const router = Router();

router.post(
    '/',
    checkBuildingPermission(getRequestBody('buildingId')),
    wrap(unitsController.createUnit)
);

router.get(
    '/',
    checkBuildingPermission(getRequestQuery('buildingId')),
    wrap(unitsController.getUnits)
);

router.patch(
    '/',
    checkUnitsPermission(getRequestBody('unitIds')),
    wrap(unitsController.updateUnit)
);

router.delete(
    '/',
    checkUnitsPermission(getRequestBody('unitIds')),
    wrap(unitsController.removeUnit)
);

router.get(
    '/:unitId',
    checkUnitPermission(getRequestParam('unitId')),
    wrap(unitsController.getUnit)
);

router.post(
    '/:unitId/owners',
    checkUnitPermission(getRequestParam('unitId')),
    wrap(ownersController.create)
);

router.get(
    '/:unitId/owners',
    checkUnitPermission(getRequestParam('unitId')),
    wrap(ownersController.findAll)
);

router.patch(
    '/:unitId/owners/:userId',
    checkOwnerPermission(getRequestParam('unitId'), getRequestParam('userId')),
    wrap(ownersController.update)
);

router.delete(
    '/:unitId/owners/:userId',
    checkOwnerPermission(getRequestParam('unitId'), getRequestParam('userId')),
    wrap(ownersController.destroy)
);

module.exports = router;
