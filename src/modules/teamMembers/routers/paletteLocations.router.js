const { Router } = require('express');
const { wrap } = require('../../../base/controller');
const { upload } = require('../../../services/aws/uploads/colors');
const paletteLocationImagesController = require('../../admins/controllers/paletteLocationImages.controller');
const { getRequestParam } = require('../../../helpers/middleware');
const { checkPaletteLocationPermission } = require('../middlewares/buildingPermissions');
const { validationResponse } = require('../../../middlewares/validators/common');
const {
    validateCreatePaletteLocationImageRequest,
    validateDeletePaletteLocationImageRequest,
} = require('../../../middlewares/validators/paletteLocationImages');

const router = Router();

router.post(
    '/:paletteLocationId/images',
    checkPaletteLocationPermission(getRequestParam('paletteLocationId')),
    upload.single('image'),
    validateCreatePaletteLocationImageRequest(),
    validationResponse,
    wrap(paletteLocationImagesController.create)
);

router.delete(
    '/:paletteLocationId/images/:imageId',
    checkPaletteLocationPermission(getRequestParam('paletteLocationId')),
    validateDeletePaletteLocationImageRequest(),
    validationResponse,
    wrap(paletteLocationImagesController.destroy)
);

module.exports = router;
