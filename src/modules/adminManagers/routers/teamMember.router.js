const { Router } = require('express');
const { wrap } = require('../../../base/controller');
const teamMemberController = require('../../admins/controllers/teamMember.controller');
const { checkUserPermission } = require('../../../middlewares/companyPermissions');
const { getRequestParam } = require('../../../helpers/middleware');

const router = Router();

router.get('/', wrap(teamMemberController.getTeamMembers));

router.get(
    '/:userId',
    checkUserPermission(getRequestParam('userId')),
    wrap(teamMemberController.getTeamMember)
);

router.patch(
    '/:userId',
    checkUserPermission(getRequestParam('userId')),
    wrap(teamMemberController.updateTeamMember)
);

router.post(
    '/:userId/set/admin',
    checkUserPermission(getRequestParam('userId')),
    wrap(teamMemberController.setAsAdmin)
);

router.delete(
    '/:userId',
    checkUserPermission(getRequestParam('userId')),
    wrap(teamMemberController.removeTeamMember)
);

module.exports = router;
