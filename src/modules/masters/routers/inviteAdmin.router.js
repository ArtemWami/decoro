const { Router } = require('express');
const { wrap } = require('../../../base/controller');
const { checkByPk } = require('../../../middlewares/primaryKey');
const { User } = require('../../../../models');
const invitationController = require('../controllers/invite.controller');

const router = Router();

router.post(
    '/:userId',
    checkByPk.exist(User, 'userId', 'user', true),
    wrap(invitationController.sendInvitation)
);

router.get(
    '/:userId',
    checkByPk.exist(User, 'userId', 'user', true),
    wrap(invitationController.getCurrentInvitation)
);

router.delete(
    '/:userId',
    checkByPk.exist(User, 'userId', 'user', true),
    wrap(invitationController.removeCurrentInvitation)
);

module.exports = router;
