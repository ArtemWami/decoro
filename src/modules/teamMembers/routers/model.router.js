const { Router } = require('express');
const { wrap } = require('../../../base/controller');
const { upload } = require('../../../services/aws/uploads/model');
const modelController = require('../../admins/controllers/model.controller');
const modelImagesController = require('../../admins/controllers/modelImages.controller');
const { getRequestParam, getRequestBody } = require('../../../helpers/middleware');
const {
    checkModelPermission,
    checkBuildingPermission,
} = require('../middlewares/buildingPermissions');

const { validationResponse } = require('../../../middlewares/validators/common');
const {
    validateCreateModelImageRequest,
    validateDeleteModelImageRequest,
} = require('../../../middlewares/validators/modelImages');

const router = Router();

router.post(
    '/:modelId/images',
    checkModelPermission(getRequestParam('modelId')),
    upload.single('image'),
    validateCreateModelImageRequest(),
    validationResponse,
    wrap(modelImagesController.create)
);

router.delete(
    '/:modelId/images/:imageId',
    checkModelPermission(getRequestParam('modelId')),
    validateDeleteModelImageRequest(),
    validationResponse,
    wrap(modelImagesController.destroy)
);

router.patch(
    '/:modelId/room',
    checkModelPermission(getRequestParam('modelId')),
    wrap(modelController.updateModelRooms)
);

/**
 * BASE MODEl ROUTING
 * */
router.post(
    '/',
    checkBuildingPermission(getRequestBody('buildingId')),
    wrap(modelController.createModel)
);

router.get(
    '/:modelId',
    checkModelPermission(getRequestParam('modelId')),
    wrap(modelController.getModel)
);

router.patch(
    '/:modelId',
    checkModelPermission(getRequestParam('modelId')),
    wrap(modelController.updateModel)
);

router.delete(
    '/:modelId',
    checkModelPermission(getRequestParam('modelId')),
    wrap(modelController.removeModel)
);

module.exports = router;
