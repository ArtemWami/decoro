const {Router} = require('express');
const {wrap} = require('../../../base/controller');
const unitsController = require('../controllers/units.controller');
const {validatePaginationParams} = require('../../../middlewares/validators/pagination');
const {validateGetUnitRequest} = require('../../../middlewares/validators/units');
const {validationResponse} = require("../../../middlewares/validators/common");
const { checkUnitOwnerPermission } = require('../middlewares/permissions');
const {getRequestParam} = require("../../../helpers/middleware");

const router = Router();

router.get(
    '/',
    validatePaginationParams(),
    validationResponse,
    wrap(unitsController.listingUnits)
);

router.get(
    '/:unitId',
    validateGetUnitRequest(),
    validationResponse,
    checkUnitOwnerPermission(getRequestParam('unitId')),
    wrap(unitsController.getUnit)
);

module.exports = router;
