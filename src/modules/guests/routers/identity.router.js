const { Router } = require('express');
const { wrap } = require('../../../base/controller');
const identityController = require('../controllers/identity.controller');
const { checkAuthorization } = require('../../../../src/middlewares/authorization');

const router = Router();

router.get('/', wrap(checkAuthorization), wrap(identityController.getIdentity));

module.exports = router;
