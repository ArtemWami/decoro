const { Router } = require('express');
const { wrap } = require('../../../base/controller');
const descriptionController = require('../../admins/controllers/description.controller');
const { getRequestBody, getRequestQuery, getRequestParam } = require('../../../helpers/middleware');
const {
    checkUnitPermission,
    checkDescriptionPermission,
} = require('../middlewares/buildingPermissions');

const router = Router();

router.post(
    '/',
    checkUnitPermission(getRequestBody('unitId')),
    wrap(descriptionController.createDescription)
);

router.get(
    '/',
    checkUnitPermission(getRequestQuery('unitId')),
    wrap(descriptionController.getDescriptions)
);

router.patch(
    '/:descriptionId',
    checkDescriptionPermission(getRequestParam('descriptionId')),
    wrap(descriptionController.updateDescription)
);

router.delete(
    '/:descriptionId',
    checkDescriptionPermission(getRequestParam('descriptionId')),
    wrap(descriptionController.removeDescription)
);

module.exports = router;
