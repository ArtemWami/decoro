const { Router } = require('express');
const { wrap } = require('../../../base/controller');
const { checkAuthorization } = require('../../../middlewares/authorization');
const { checkRolePermissions } = require('../../../middlewares/checkRolePermission');
const { User } = require('../../../../models');

const unitsRouter = require('./units.router');

const router = Router();
router.use(wrap(checkAuthorization));
router.use(checkRolePermissions([User.ROLE.OWNER]));

router.use('/units', unitsRouter);

module.exports = router;
