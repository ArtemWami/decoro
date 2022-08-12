const { Router } = require('express');
const { wrap } = require('../../../base/controller');
const invitationController = require('../controllers/invite.controller');
const { checkUserPermission } = require('../../../middlewares/companyPermissions');
const { getRequestParam } = require('../../../helpers/middleware');

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
