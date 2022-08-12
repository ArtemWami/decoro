const userInvitationService = require('../../../services/userInvitation');
const userService = require('../../../services/user');
const authService = require('../../../services/auth');
const companyService = require('../../../services/company');
const stripeService = require('../../../services/stripe');
const { Company, User } = require('../../../../models');
const { NotFoundError, BadRequestError, ConflictError } = require('../../../errors');

const oneDaySeconds = 60 * 60 * 24 * 1000;

const verifyAndSetPassword = async (req, res) => {
    const { companyId, status: companyStatus } = req.state.company;
    const subdomain = req.state.subdomain;
    const { invitationKey, audience, firstName, lastName, password } = req.body;

    /** Check invitation */
    const invitation = await userInvitationService.findOneByKey({
        companyId,
        audience,
        key: invitationKey,
    });

    if (!invitation) {
        throw new NotFoundError({ message: 'INVITATION NOT FOUND' });
    }

    const { userId, createdAt, verify } = invitation;
    if (new Date() - createdAt > oneDaySeconds) {
        throw new BadRequestError({ message: 'INVITATION IS EXPIRED' });
    }

    if (verify === true) {
        throw new ConflictError({ message: 'INCORRECT INVITATION USER IS VERIFIED' });
    }

    /** Check user */
    const user = await userService.findUser.one.byUserId({ userId });
    if (!user) {
        throw new NotFoundError({ message: 'USER NOT FOUND' });
    }

    const { role, email, phone } = user;

    /** Update verification data */
    await userService.updateUser.one.byUserId(
        { userId },
        {
            firstName,
            lastName,
            emailVerified: true,
            status: User.STATUS.ACTIVE,
        }
    );

    await userService.setPassword({ userId }, { password });
    await userInvitationService.verifyInvitation({ userId });

    /** CREATE TOKEN */
    const accessToken = await authService.sign({ userId, email, role, subdomain: subdomain.name });

    /** SET LAST LOGIN DATA */
    await userService.updateUser.one.byUserId({ userId }, { lastLogin: new Date() });

    /** INVITATION VERIFY */
    if ([Company.STATUS.PENDING, Company.STATUS.INACTIVE].includes(companyStatus)) {
        await companyService.updateCompany.one.byCompanyId(
            { companyId },
            { status: Company.STATUS.ACTIVE }
        );
    }

    /** UPDATE STRIPE CUSTOMER IF IT EXIST */
    const customer = await stripeService.customer.get.db.one.byUserId({ userId });
    if (customer) {
        const { customerStripeId } = customer;
        await stripeService.customer.update({
            customerStripeId,
            email,
            phone,
            name: `${firstName} ${lastName}`,
        });
    }

    res.json({ msg: 'USER IS VERIFIED', accessToken });
};

const getInvitationData = async (req, res) => {
    const { companyId } = req.state.company;
    const { invitationKey, audience } = req.query;

    /** Check invitation */
    const invitation = await userInvitationService.findOneByKey({
        audience,
        companyId,
        key: invitationKey,
    });

    if (!invitation) {
        throw new NotFoundError({ message: 'INVITATION IS NOT EXIST' });
    }

    const { userId, createdAt, verify } = invitation;
    if (new Date() - createdAt > oneDaySeconds) {
        throw new BadRequestError({ message: 'INVITATION IS EXPIRED' });
    }

    if (verify === true) {
        throw new ConflictError({ message: 'INCORRECT INVITATION USER IS VERIFIED' });
    }

    /** Check user */
    const user = await userService.findUser.one.byUserId({ userId });
    if (!user) {
        throw new NotFoundError({ message: 'USER IS NOT EXIST' });
    }

    const { firstName, lastName, email } = user;
    res.json({ data: { firstName, lastName, email, userId } });
};

module.exports = {
    verifyAndSetPassword,
    getInvitationData,
};
