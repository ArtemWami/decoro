const userService = require('../../../services/user');
const changeEmailHandlerService = require('../../../services/changeEmailHandler');
const stripeService = require('../../../services/stripe');
const emailsService = require('../../../services/emails');
const { User, TransactionalEmailTemplate } = require('../../../../models');
const { BadRequestError } = require('../../../errors');
const { comparePassword } = require('../../../helpers/users');
const { generateKey } = require('../../../services/aws/utils');
const { buildUrl } = require('../../../helpers/templates');

/**
 * Update user admin
 * */
const updateAdmin = async (req, res) => {
    const { firstName, lastName, email, phone, jobTitle } = req.body;
    const { user } = req.state;
    const { userId } = user;
    const currentUser = await userService.findUser.one.byUserId({ userId });
    const { companies, email: currentEmail } = currentUser;
    const { companyId, subdomain } = companies;
    await userService.updateUser.one.byUserId({ userId }, { firstName, lastName, phone, jobTitle });

    /** STRIPE UPDATE */
    const customer = await stripeService.customer.get.db.one.byUserId({ userId });
    if (customer) {
        const { customerStripeId } = customer;
        const stripeUpdateObj = {};
        if (phone) stripeUpdateObj.phone = phone;
        if (firstName || lastName) stripeUpdateObj.name = `${firstName || ''} ${lastName || ''}`;

        await stripeService.customer.update({
            ...stripeUpdateObj,
            customerStripeId,
        });
    }

    /** CHANGE EMAIL */
    if (email && currentEmail !== email) {
        /** CHECK UPDATE EMAIL SESSION */
        /** REMOVE CURRENT EMAIL SESSION */
        const updateSession = await changeEmailHandlerService.find.one.byUserCompanyId({
            userId,
            companyId,
        });
        if (updateSession) {
            const { changeEmailHandlerId } = updateSession;
            await changeEmailHandlerService.remove.byId({ changeEmailHandlerId });
        }

        /** CREATE EMAIL SESSION */
        const confirmationKey = generateKey();
        const cancelKey = generateKey();
        await changeEmailHandlerService.create({
            userId,
            companyId,
            subdomainId: subdomain.subdomainId,
            oldEmail: currentEmail,
            newEmail: email,
            confirmationKey,
            cancelKey,
        });

        /** SEND CONFIRMATION EMAIL */
        const confirmationUrl = buildUrl(subdomain, `/admin/update/email/${confirmationKey}`);
        await emailsService.sendTransactionalEmail(
            {
                companyId,
                to: email,
                subdomainId: subdomain.subdomainId,
                type: TransactionalEmailTemplate.TYPE.CHANGE_EMAIL_CONFIRMATION_STEP_1,
            },
            { url: confirmationUrl }
        );

        /** SEND CANCEL EMAIL */
        const cancelUrl = buildUrl(subdomain, `/admin/update/email/${cancelKey}/cancel`);
        await emailsService.sendTransactionalEmail(
            {
                companyId,
                to: currentEmail,
                subdomainId: subdomain.subdomainId,
                type: TransactionalEmailTemplate.TYPE.CHANGE_EMAIL_CANCEL_STEP_1,
            },
            { url: cancelUrl }
        );
    }

    const updatedUser = await userService.findUser.one.byUserId({ userId });
    res.json({ data: updatedUser });
};

const setNewPassword = async (req, res) => {
    const { user } = req.state;
    const { email, userId } = user;
    const { oldPassword, newPassword } = req.body;

    /** GET CURRENT USER DATA */
    const currentUser = await userService.findUser.one.byEmailIncludeCompany({
        email,
        attributes: User.attributes.auth,
    });
    const { password: basePassword } = currentUser;

    /** CHECK MATCH PASSWORD */
    const matched = await comparePassword(oldPassword, basePassword);
    if (!matched) throw new BadRequestError({ message: 'INCORRECT PASSWORD !!!' });

    /** SET NEW PASSWORD */
    await userService.setPassword({ userId }, { password: newPassword });

    res.json({ message: 'NEW PASSWORD IS SET !!!' });
};

module.exports = {
    updateAdmin,
    setNewPassword,
};
