const { Router } = require('express');
const { wrap } = require('../../../base/controller');
const finishTypesController = require('../../admins/controllers/finishTypes.controller');
const finishTypePaletteImagesController = require('../../admins/controllers/finishTypePaletteImages.controller');
const { validationResponse } = require('../../../middlewares/validators/common');
const { upload } = require('../../../services/aws/uploads/finishType');
const { getRequestBody, getRequestParam } = require('../../../helpers/middleware');
const {
    validateCreateFinishTypeRequest,
    validateUpdateFinishTypeRequest,
    validateDeleteFinishTypeRequest,
} = require('../../../middlewares/validators/finishTypes');

const {
    checkOptionPermission,
    checkFinishTypePermission,
} = require('../middlewares/buildingPermissions');
const {
    validateCreateFinishTypePaletteImageRequest,
    validateDeleteFinishTypePaletteImageRequest,
} = require('../../../middlewares/validators/finishTypePaletteImages');

const router = Router();

router.post(
    '/',
    checkOptionPermission(getRequestBody('optionsId')),
    validateCreateFinishTypeRequest(),
    validationResponse,
    wrap(finishTypesController.create)
);

router.patch(
    '/:finishTypeId',
    checkFinishTypePermission(getRequestParam('finishTypeId')),
    validateUpdateFinishTypeRequest(),
    validationResponse,
    wrap(finishTypesController.update)
);

router.delete(
    '/:finishTypeId',
    checkFinishTypePermission(getRequestParam('finishTypeId')),
    validateDeleteFinishTypeRequest(),
    validationResponse,
    wrap(finishTypesController.destroy)
);

router.post(
    '/:finishTypeId/images',
    checkFinishTypePermission(getRequestParam('finishTypeId')),
    upload.single('image'),
    validateCreateFinishTypePaletteImageRequest(),
    validationResponse,
    wrap(finishTypePaletteImagesController.create)
);

router.delete(
    '/:finishTypeId/images/:imageId',
    checkFinishTypePermission(getRequestParam('finishTypeId')),
    validateDeleteFinishTypePaletteImageRequest(),
    validationResponse,
    wrap(finishTypePaletteImagesController.destroy)
);

module.exports = router;
