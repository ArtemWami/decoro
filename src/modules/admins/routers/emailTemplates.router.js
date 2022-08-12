const { Router } = require('express');
const { wrap } = require('../../../base/controller');
const emailTemplatesController = require('../controllers/emailTemplates.controller');
const emailTemplateImagesController = require('../controllers/emailTemplateImages.controller');
const { upload } = require('../../../services/aws/uploads/emailTemplate');
const { validationResponse } = require('../../../middlewares/validators/common');
const {
    validateFindOneEmailTemplateRequest,
    validateUpdateEmailTemplateRequest,
    validateDeleteEmailTemplateRequest,
    validateSendEmailTemplateRequest,
} = require('../../../middlewares/validators/emailTemplates');

const {
    validateCreateEmailTemplateImageRequest,
} = require('../../../middlewares/validators/emailTemplateImages');

const router = Router();

router.get('/', wrap(emailTemplatesController.findAll));

router.get(
    '/:emailTemplateId',
    validateFindOneEmailTemplateRequest(),
    validationResponse,
    wrap(emailTemplatesController.findOne)
);

router.patch(
    '/:emailTemplateId',
    validateUpdateEmailTemplateRequest(),
    validationResponse,
    wrap(emailTemplatesController.update)
);

router.delete(
    '/:emailTemplateId',
    validateDeleteEmailTemplateRequest(),
    validationResponse,
    wrap(emailTemplatesController.destroy)
);

router.post(
    '/:emailTemplateId/images',
    upload.single('image'),
    validateCreateEmailTemplateImageRequest(),
    validationResponse,
    wrap(emailTemplateImagesController.create)
);

router.post(
    '/:emailTemplateId/send',
    validateSendEmailTemplateRequest(),
    validationResponse,
    wrap(emailTemplatesController.send)
);

module.exports = router;
