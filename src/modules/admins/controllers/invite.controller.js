const { generateKey } = require('../../../services/aws/utils');
const userInvitationService = require('../../../services/userInvitation');
const companyService = require('../../../services/company');
const userService = require('../../../services/user');
const emailsService = require('../../../services/emails');
const { User, Company, TransactionalEmailTemplate } = require('../../../../models');
const { ConflictError, BadRequestError } = require('../../../errors');
const { buildUrl } = require('../../../helpers/templates');

const regex = new RegExp('[a-z0-9]+@[a-z]+.[a-z]{2,3}');

const sendInvitation = async (req, res) => {
    const { emails } = req.body;
    /** CHECK TEAM_MEMBERS EMAILS */
    emails.forEach((email) => {
        const isValidEmail = regex.test(email);
        if (!isValidEmail) {
            throw new BadRequestError({ message: 'INVALID EMAIL!!!!!' });
        }
    });

    const { companyId } = req.state.company;
    const { subdomainId } = req.state.subdomain;
    const createInvitation = async (email) => {
        const invitationKey = generateKey();

        /** CHECK USER AND CREATE */
        let user = await userService.findUser.one.byEmail({ email, companyId });
        if (!user) {
            user = await userService.createUser({
                email,
                subdomainId,
                companyId,
                role: User.ROLE.TEAM_MEMBER,
            });
        }

        const { userId } = user;

        /** CHECK INVITATION. (Invitation should be single) */
        let invitation = await userInvitationService.findUserInvitation.one.byUserId({ userId });
        if (invitation && invitation.verify === true) {
            throw new ConflictError({ message: 'THIS USER IS VERIFIED' });
        }

        if (invitation && invitation.verify === false) {
            await userInvitationService.removeUserInvitation.one.byUserId({ userId });
        }

        await userInvitationService.createUserInvitation({
            userId,
            email,
            companyId,
            subdomainId,
            key: invitationKey,
        });

        /** SEND INVITATION */
        const url = buildUrl(req.state.subdomain, `/admin/registration/${invitationKey}`);
        await emailsService.sendTransactionalEmail(
            {
                companyId,
                subdomainId,
                to: email,
                type: TransactionalEmailTemplate.TYPE.TEAM_MEMBER_INVITATION,
            },
            { email, url }
        );
    };

    await Promise.all(emails.map(createInvitation));

    res.json({ msg: 'INVITATION SEND' });
};

const getCurrentInvitation = async (req, res) => {
    const { user } = req.state;
    const { userId } = user;

    /** Check invitation */
    const invitationExist = await userInvitationService.findUserInvitation.one.byUserId({ userId });
    if (invitationExist && invitationExist.verify === true)
        return res.json({ inviteStatus: 'VERIFIED', message: 'THIS USER IS VERIFIED' });

    res.json(
        invitationExist
            ? { ...invitationExist.dataValues, inviteStatus: 'ACTIVE' }
            : { inviteStatus: 'INACTIVE' }
    );
};

const removeCurrentInvitation = async (req, res) => {
    const { user } = req.state;
    const { userId, role, companyId } = user;

    /** Check invitation */
    const invitationExist = await userInvitationService.findUserInvitation.one.byUserId({ userId });
    if (invitationExist && invitationExist.verify === true)
        throw new ConflictError({ message: 'THIS USER IS VERIFIED' });

    /** Remove invitation */
    if (invitationExist && invitationExist.verify === false)
        await userInvitationService.removeUserInvitation.one.byUserId({ userId });

    /** Update company state if Company Account Admin is invited */
    if (role === User.ROLE.ADMIN)
        companyService.updateCompany.one.byCompanyId(
            { companyId },
            {
                status: Company.STATUS.DRAFT,
            }
        );

    res.json({ msg: 'INVITATION IS REMOVED!!!' });
};

module.exports = {
    sendInvitation,
    getCurrentInvitation,
    removeCurrentInvitation,
};
