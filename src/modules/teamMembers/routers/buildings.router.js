const { Router } = require('express');
const { wrap } = require('../../../base/controller');
const { getRequestParam } = require('../../../helpers/middleware');
const { upload } = require('../../../services/aws/uploads/building');
const buildingsController = require('../controllers/buildings.controller');
const buildingImagesController = require('../../admins/controllers/buildingImages.controller');
const {
    checkBuildingPermission,
    provideUserBuildingIds,
} = require('../middlewares/buildingPermissions');

const { validationResponse } = require('../../../middlewares/validators/common');
const {
    validateCreateBuildingImageRequest,
    validateDeleteBuildingImageRequest,
} = require('../../../middlewares/validators/buildingImages');

const router = Router();

router.post(
    '/:buildingId/images',
    checkBuildingPermission(getRequestParam('buildingId')),
    upload.single('image'),
    validateCreateBuildingImageRequest(),
    validationResponse,
    wrap(buildingImagesController.create)
);

router.delete(
    '/:buildingId/images/:imageId',
    checkBuildingPermission(getRequestParam('buildingId')),
    validateDeleteBuildingImageRequest(),
    validationResponse,
    wrap(buildingImagesController.destroy)
);

/**
 * CRUD BUILDING
 * */
router.get('/', provideUserBuildingIds, wrap(buildingsController.listingBuilding));

router.get(
    '/:buildingId',
    checkBuildingPermission(getRequestParam('buildingId')),
    wrap(buildingsController.getBuilding)
);

router.patch(
    '/:buildingId',
    checkBuildingPermission(getRequestParam('buildingId')),
    wrap(buildingsController.updateBuilding)
);

/**  BUILDING MODEL INFORMATION */
router.get(
    '/:buildingId/model',
    checkBuildingPermission(getRequestParam('buildingId')),
    wrap(buildingsController.findBuildingModels)
);

/**  BUILDING ROOM INFORMATION */
router.get(
    '/:buildingId/room',
    checkBuildingPermission(getRequestParam('buildingId')),
    wrap(buildingsController.findBuildingRooms)
);

module.exports = router;
