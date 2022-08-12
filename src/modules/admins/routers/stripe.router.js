const { Router } = require('express');
const { wrap } = require('../../../base/controller');
const subscriptionController = require('../controllers/stripe.controller');

const router = Router();

router.post('/subscription', wrap(subscriptionController.createSubscription));
router.post('/payment/method', wrap(subscriptionController.createPaymentMethod));
router.get('/card', wrap(subscriptionController.getCardInfo));

module.exports = router;
