const { Router } = require('express');
const { checkSubdomainPermission } = require('../middleware/subdomainPermissions');

const authRouter = require('./auth.router');
const changeEmailsRouter = require('./changeEmails.router');
const companyRouter = require('./company.router');
const forgotPasswordRouter = require('./forgotPassword.router');
const identityRouter = require('./identity.router');
const inviteRouter = require('./invite.router');
const webhookRouter = require('./webhook.router');

const router = Router();
router.use(checkSubdomainPermission());

router.use('/user/auth', authRouter);
router.use('/change-emails', changeEmailsRouter);
router.use('/company', companyRouter);
router.use('/password/forgot', forgotPasswordRouter);
router.use('/identity', identityRouter);
router.use('/invitation', inviteRouter);
router.use('/webhook', webhookRouter);

module.exports = router;
