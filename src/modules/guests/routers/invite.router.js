const { Router } = require('express');
const { wrap } = require('../../../base/controller');
const invitationController = require('../controllers/invite.controller');
const { validationResponse } = require('../../../middlewares/validators/common');
const {
    validateInvitationInfoRequest,
    validateVerifyInvitationRequest,
} = require('../../../middlewares/validators/invitations');

const router = Router();

router.post(
    '/verify',
    validateVerifyInvitationRequest(),
    validationResponse,
    wrap(invitationController.verifyAndSetPassword)
);

router.get(
    '/info',
    validateInvitationInfoRequest(),
    validationResponse,
    wrap(invitationController.getInvitationData)
);

module.exports = router;
