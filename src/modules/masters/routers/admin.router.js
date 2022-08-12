const { Router } = require('express');
const { User, Company, Subdomain } = require('../../../../models');
const { wrap } = require('../../../base/controller');
const { checkUser } = require('../../../middlewares/user');
const { checkByPk } = require('../../../middlewares/primaryKey');
const adminController = require('../controllers/admin.controller');

const router = Router();

router.post(
    '/',
    checkUser.byEmail({ required: true, isExist: false }),
    checkByPk.exist(Company, 'companyId', 'company', true),
    checkByPk.exist(Subdomain, 'subdomainId', 'subdomain', true),
    wrap(adminController.createAdmin)
);

router.get('/', wrap(adminController.getAdmins));

router.get(
    '/:userId',
    checkByPk.exist(User, 'userId', 'user', true),
    wrap(adminController.getAdmin)
);

router.patch(
    '/:userId',
    checkByPk.exist(User, 'userId', 'user', true),
    wrap(adminController.updateAdmin)
);

router.delete(
    '/:userId',
    checkByPk.exist(User, 'userId', 'user', true),
    wrap(adminController.removeAdmin)
);

module.exports = router;
