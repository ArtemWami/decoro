const { Router } = require('express');
const { wrap } = require('../../../base/controller');
const webhookController = require('../controllers/webhook.controller');

const router = Router();

router.post('/', wrap(webhookController.setWebhook));

module.exports = router;
