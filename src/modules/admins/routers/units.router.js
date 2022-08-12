const { Router } = require('express');
const { wrap } = require('../../../base/controller');
const unitsController = require('../controllers/units.controller');
const ownersController = require('../controllers/owners.controller');
const { getRequestBody, getRequestParam, getRequestQuery } = require('../../../helpers/middleware');
const {
    checkBuildingPermission,
    checkUnitsPermission,
    checkUnitPermission,
    checkUserPermission,
} = require('../../../middlewares/companyPermissions');

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
    checkUnitPermission(getRequestParam('unitId')),
    checkUserPermission(getRequestParam('userId')),
    wrap(ownersController.update)
);

router.delete(
    '/:unitId/owners/:userId',
    checkUnitPermission(getRequestParam('unitId')),
    checkUserPermission(getRequestParam('userId')),
    wrap(ownersController.destroy)
);

module.exports = router;
