const { Router } = require('express');
const { wrap } = require('../../../base/controller');
const paletteController = require('../controllers/palette.controller');
const { getRequestBody, getRequestQuery, getRequestParam } = require('../../../helpers/middleware');
const {
    checkBuildingPermission,
    checkPalettePermission,
} = require('../../../middlewares/companyPermissions');
const { validateCreatePaletteRequest } = require('../../../middlewares/validators/palette');
const { validationResponse } = require("../../../middlewares/validators/common");

const router = Router();

router.post(
    '/',
    validateCreatePaletteRequest(),
    validationResponse,
    checkBuildingPermission(getRequestBody('buildingId')),
    wrap(paletteController.createPalette)
);

router.get(
    '/',
    checkBuildingPermission(getRequestQuery('buildingId')),
    wrap(paletteController.getAllPalettes)
);

router.get(
    '/:paletteId',
    checkPalettePermission(getRequestParam('paletteId')),
    wrap(paletteController.getOnePalette)
);

router.patch(
    '/:paletteId',
    checkPalettePermission(getRequestParam('paletteId')),
    wrap(paletteController.updatePalette)
);

router.delete(
    '/:paletteId',
    checkPalettePermission(getRequestParam('paletteId')),
    wrap(paletteController.removePalette)
);

module.exports = router;
