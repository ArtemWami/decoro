const { Router } = require('express');
const { wrap } = require('../../../base/controller');
const { checkByPk } = require('../../../middlewares/primaryKey');
const { checkSubdomain } = require('../../../middlewares/subdomine');
const { validationResponse } = require('../../../middlewares/validators/common');
const {
    validateCreateCompanyImageRequest,
    validateDeleteCompanyImageRequest,
} = require('../../../middlewares/validators/companyImages');

const {
    validateCreateCompanyRequest,
    validateUpdateCompanyRequest,
    validateFindOneCompanyRequest,
    validateDeleteCompanyRequest,
} = require('../middlewares/validators/companies');

const { upload } = require('../../../services/aws/uploads/company');
const { Company } = require('../../../../models');
const companyController = require('../controllers/company.controller');
const companyImagesController = require('../controllers/companyImages.controller');

const router = Router();

/**
 * COMPANY CREATION
 * FOR PAGE https://www.figma.com/file/fVOaE698iSBtIOvY9hyGHc/Decoro-(Master-Admin)?node-id=1143%3A1233
 * */
router.post(
    '/',
    validateCreateCompanyRequest(),
    validationResponse,
    checkSubdomain.bySubdomainName({ required: true, isExist: false }),
    wrap(companyController.createCompany)
);

router.get('/', wrap(companyController.readCompany));

router.get(
    '/:companyId',
    validateFindOneCompanyRequest(),
    validationResponse,
    checkByPk.exist(Company, 'companyId', 'company', true),
    wrap(companyController.findCompany)
);

router.patch(
    '/:companyId',
    validateUpdateCompanyRequest(),
    validationResponse,
    checkByPk.exist(Company, 'companyId', 'company', true),
    wrap(companyController.updateCompany)
);

router.delete(
    '/:companyId',
    validateDeleteCompanyRequest(),
    validationResponse,
    checkByPk.exist(Company, 'companyId', 'company', true),
    wrap(companyController.deleteCompany)
);

router.post(
    '/:companyId/images',
    upload.single('image'),
    validateCreateCompanyImageRequest(),
    validationResponse,
    wrap(companyImagesController.create)
);

router.delete(
    '/:companyId/images/:imageId',
    validateDeleteCompanyImageRequest(),
    wrap(companyImagesController.destroy)
);

module.exports = router;
