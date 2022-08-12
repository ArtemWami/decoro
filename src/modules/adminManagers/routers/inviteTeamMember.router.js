const { Router } = require('express');
const { wrap } = require('../../../base/controller');
const invitationController = require('../../admins/controllers/invite.controller');
const { getRequestParam } = require('../../../helpers/middleware');
const { checkUserPermission } = require('../../../middlewares/companyPermissions');

const router = Router();

router.post('/', wrap(invitationController.sendInvitation));

router.get(
    '/:userId',
    checkUserPermission(getRequestParam('userId')),
    wrap(invitationController.getCurrentInvitation)
);

router.delete(
    '/:userId',
    checkUserPermission(getRequestParam('userId')),
    wrap(invitationController.removeCurrentInvitation)
);

module.exports = router;
