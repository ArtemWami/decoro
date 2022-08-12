const changeEmailHandlerService = require('../../../services/changeEmailHandler');
const userService = require('../../../services/user');
const companyService = require('../../../services/company');
const stripeService = require('../../../services/stripe');
const emailsService = require('../../../services/emails');
const { buildUrl } = require('../../../helpers/templates');
const { TransactionalEmailTemplate } = require('../../../../models');
const { NotFoundError, BadRequestError } = require('../../../errors');

const ONE_DAY = 1000 * 60 * 60 * 24;

const confirm = async (req, res) => {
    const { companyId } = req.state.company;
    const { confirmationKey, audience } = req.body;

    /** CHECK SESSION EXIST */
    const confirmSession = await changeEmailHandlerService.find.one.byConfirmationKey({
        confirmationKey,
        audience,
        companyId,
    });

    if (!confirmSession) {
        throw new NotFoundError({ message: 'CONFIRMATION SESSION IS NOT FOUND !!!' });
    }

    /** CHECK SESSION EXPIRED */
    const {
        changeEmailHandlerId,
        userId,
        oldEmail,
        newEmail,
        isUpdated,
        cancelKey,
        createdAt: startConfirmationSession,
    } = confirmSession;

    if (ONE_DAY < new Date() - startConfirmationSession) {
        throw new BadRequestError({ message: 'SESSION IS EXPIRED' });
    }

    /** IS SESSION EMAIL UPDATED */
    if (isUpdated === true) {
        throw new BadRequestError({ message: 'EMAIL IS ALREADY UPDATED' });
    }

    const company = await companyService.findCompany.one.byCompanyId({ companyId });
    const { subdomain } = company;

    /** CLOSE CONFIRMATION SESSION */
    await changeEmailHandlerService.update.one.byId({ changeEmailHandlerId }, { isUpdated: true });

    /** UPDATE USER EMAIL */
    await userService.updateUser.one.byUserId({ userId }, { email: newEmail });

    /** STRIPE UPDATE EMAIL */
    const customer = await stripeService.customer.get.db.one.byUserId({ userId });
    if (customer && newEmail) {
        const { customerStripeId } = customer;
        await stripeService.customer.update({ email: newEmail, customerStripeId });
    }

    /** SEND CANCEL EMAIL FOR OLD EMAIL */
    const cancelUrl = buildUrl(subdomain, `/admin/update/email/${cancelKey}/cancel`);
    await emailsService.sendTransactionalEmail(
        {
            companyId,
            to: oldEmail,
            subdomainId: subdomain.subdomainId,
            type: TransactionalEmailTemplate.TYPE.CHANGE_EMAIL_CANCEL_STEP_2,
        },
        { oldEmail, newEmail, url: cancelUrl }
    );

    /** SEND CONFIRMATION EMAIL FOR NEW EMAIL */
    await emailsService.sendTransactionalEmail({
        companyId,
        to: newEmail,
        subdomainId: subdomain.subdomainId,
        type: TransactionalEmailTemplate.TYPE.CHANGE_EMAIL_CONFIRMATION_STEP_2,
    });

    res.json({ message: 'EMAIL UPDATED!!!' });
};

const cancel = async (req, res) => {
    const { companyId } = req.state.company;
    const { cancelKey, audience } = req.body;

    /** CHECK SESSION EXIST */
    const confirmSession = await changeEmailHandlerService.find.one.byCancelKey({
        cancelKey,
        audience,
        companyId,
    });

    if (!confirmSession) {
        throw new NotFoundError({ message: 'CONFIRMATION SESSION IS NOT FOUND !!!' });
    }

    /** CHECK SESSION EXPIRED */
    const {
        changeEmailHandlerId,
        userId,
        oldEmail,
        isUpdated,
        createdAt: startConfirmationSession,
    } = confirmSession;

    if (ONE_DAY < new Date() - startConfirmationSession) {
        throw new BadRequestError({ message: 'SESSION IS EXPIRED' });
    }

    if (isUpdated === true) {
        /** REVERT USER EMAIL */
        await userService.updateUser.one.byUserId({ userId }, { email: oldEmail });

        /** STRIPE REVERT EMAIL */
        const customer = await stripeService.customer.get.db.one.byUserId({ userId });
        if (customer && oldEmail) {
            const { customerStripeId } = customer;
            await stripeService.customer.update({ email: oldEmail, customerStripeId });
        }
    }

    /** REMOVE UPDATE EMAIL SESSION */
    await changeEmailHandlerService.remove.byId({ changeEmailHandlerId });

    res.json({ message: 'SESSION CANCELED' });
};

module.exports = {
    confirm,
    cancel,
};
