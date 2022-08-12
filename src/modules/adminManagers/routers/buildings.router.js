const { Router } = require('express');
const { wrap } = require('../../../base/controller');
const { upload } = require('../../../services/aws/uploads/building');
const buildingsController = require('../../admins/controllers/buildings.controller');
const buildingImagesController = require('../../admins/controllers/buildingImages.controller');
const { getRequestParam, getRequestBody } = require('../../../helpers/middleware');
const {
    checkBuildingPermission,
    checkUserPermission,
    checkUsersPermission,
} = require('../../../middlewares/companyPermissions');

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

/** ASSIGN USERS TO BUILDING */
router.post(
    '/user/assign',
    checkUsersPermission(getRequestBody('userIds')),
    checkBuildingPermission(getRequestBody('buildingId')),
    wrap(buildingsController.assignUserToBuilding)
);

router.delete(
    '/user/assign',
    checkUserPermission(getRequestBody('userId')),
    checkBuildingPermission(getRequestBody('buildingId')),
    wrap(buildingsController.reAssignUserToBuilding)
);

/**
 * CRUD BUILDING
 * */
router.post('/', upload.single('image'), wrap(buildingsController.create));
router.get('/', wrap(buildingsController.listingBuilding));

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

router.delete(
    '/:buildingId',
    checkBuildingPermission(getRequestParam('buildingId')),
    wrap(buildingsController.removeBuilding)
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

router.post(
    '/:buildingId/start-campaign',
    checkBuildingPermission(getRequestParam('buildingId')),
    wrap(buildingsController.startCampaign)
);

module.exports = router;
