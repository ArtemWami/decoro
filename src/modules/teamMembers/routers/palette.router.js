const { Router } = require('express');
const { wrap } = require('../../../base/controller');
const paletteController = require('../../admins/controllers/palette.controller');
const { getRequestQuery, getRequestParam, getRequestBody } = require('../../../helpers/middleware');
const {
    checkBuildingPermission,
    checkPalettePermission,
} = require('../middlewares/buildingPermissions');

const router = Router();

/** BASE PALETTE CREATION */
router.post(
    '/',
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
