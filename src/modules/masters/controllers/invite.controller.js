const { User, Company, TransactionalEmailTemplate } = require('../../../../models');
const userInvitationService = require('../../../services/userInvitation');
const companyService = require('../../../services/company');
const emailsService = require('../../../services/emails');
const { generateKey } = require('../../../services/aws/utils');
const { buildUrl } = require('../../../helpers/templates');
const { ConflictError, NotFoundError } = require('../../../errors');

const sendInvitation = async (req, res) => {
    const { user } = req.state;
    const { email, userId, role, companyId } = user;

    /** Check company info */
    const company = await companyService.findCompany.one.byCompanyId({ companyId });
    if (!company) throw new NotFoundError({ message: 'COMPANY IS NOT EXIST!!!' });

    /** Check subdomain info */
    const { subdomain } = company;
    if (!subdomain) throw new NotFoundError({ message: 'SUBDOMAIN IS NOT EXIST!!!' });

    const invitationKey = generateKey();

    /** Check invitation. Invitation should be single */
    const invitationExist = await userInvitationService.findUserInvitation.one.byUserId({ userId });
    if (invitationExist && invitationExist.verify === true)
        throw new ConflictError({ message: 'THIS USER IS VERIFIED' });

    if (invitationExist && invitationExist.verify === false)
        await userInvitationService.removeUserInvitation.one.byUserId({ userId });

    /** Save invitation record */
    await userInvitationService.createUserInvitation({
        userId,
        email,
        key: invitationKey,
        companyId: company.companyId,
        subdomainId: subdomain.subdomainId,
    });

    /** Update company state if Company Account Admin is invited */
    if (role === User.ROLE.ADMIN) {
        await companyService.updateCompany.one.byCompanyId(
            { companyId },
            { status: Company.STATUS.PENDING }
        );
    }

    const url = buildUrl(subdomain, `/admin/registration/${invitationKey}`);
    await emailsService.sendTransactionalEmail(
        {
            companyId,
            to: email,
            subdomainId: subdomain.subdomainId,
            type: TransactionalEmailTemplate.TYPE.ADMIN_INVITATION,
        },
        { email, url }
    );

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
    if (role === User.ROLE.ADMIN) {
        await companyService.updateCompany.one.byCompanyId(
            { companyId },
            { status: Company.STATUS.DRAFT }
        );
    }

    res.json({ msg: 'INVITATION IS REMOVED!!!' });
};

module.exports = {
    sendInvitation,
    getCurrentInvitation,
    removeCurrentInvitation,
};
