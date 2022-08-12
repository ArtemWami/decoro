const { Router } = require('express');
const { wrap } = require('../../../base/controller');
const { checkAuthorization } = require('../../../middlewares/authorization');
const { checkRolePermissions } = require('../../../middlewares/checkRolePermission');
const { User } = require('../../../../models');

const adminRouter = require('./admin.router');
const companyRouter = require('./company.router');
const cronRouter = require('./cron.router');
const emailTemplatesRouter = require('./emailTemplates.router');
const inviteAdminRouter = require('./inviteAdmin.router');

const router = Router();
router.use(wrap(checkAuthorization));
router.use(checkRolePermissions([User.ROLE.MASTER]));

router.use('/admin', adminRouter);
router.use('/company', companyRouter);
router.use('/cron', cronRouter);
router.use('/email-templates', emailTemplatesRouter);
router.use('/invitation/admin', inviteAdminRouter);

module.exports = router;
