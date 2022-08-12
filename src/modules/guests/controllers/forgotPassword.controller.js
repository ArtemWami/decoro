const httpStatusCodes = require('http-status-codes');
const forgotPasswordService = require('../../../services/forgotPassword');
const userService = require('../../../services/user');
const emailsService = require('../../../services/emails');
const { generateKey } = require('../../../services/aws/utils');
const { Company, TransactionalEmailTemplate } = require('../../../../models');
const { NotFoundError, RequestTimeoutError, ConflictError } = require('../../../errors');
const { buildUrl } = require('../../../helpers/templates');

const ONE_DAY_MS = 24 * 60 * 60 * 1000;

const forgotPassword = async (req, res) => {
    const { email, audience } = req.body;
    const { companyId, status: companyStatus } = req.state.company;
    if (companyStatus !== Company.STATUS.ACTIVE) {
        throw new ConflictError({
            message: `COMPANY OF CURRENT USER HAS NO ${Company.STATUS.ACTIVE} STATUS`,
        });
    }

    const user = await userService.findOneByEmail({ email, companyId, audience });
    if (!user) {
        // Do not expose user presence
        res.sendStatus(httpStatusCodes.NO_CONTENT);
        return;
    }

    /** Check user invitation */
    if (user.emailVerified === false) {
        throw new NotFoundError({ message: 'USER IS NOT VERIFIED !!!' });
    }

    /** check old forgot password session should be removed */
    await forgotPasswordService.destroyByUserId({ userId: user.userId });

    const { subdomainId } = req.state.subdomain;

    /** save forgot password session  record */
    const forgotPasswordKey = generateKey();
    await forgotPasswordService.create({
        email,
        companyId,
        subdomainId,
        createdBy: user.userId,
        key: forgotPasswordKey,
    });

    /** send email for forgot password */
    const url = buildUrl(req.state.subdomain, `/admin/forgot-password/${forgotPasswordKey}`);
    await emailsService.sendTransactionalEmail(
        {
            companyId,
            subdomainId,
            to: email,
            type: TransactionalEmailTemplate.TYPE.FORGOT_PASSWORD,
        },
        { url }
    );

    res.sendStatus(httpStatusCodes.NO_CONTENT);
};

const setPassword = async (req, res) => {
    const { companyId } = req.state.company;
    const { forgotPasswordKey, password, audience } = req.body;

    /** check forgot password session - fpSession */
    const fpSession = await forgotPasswordService.findOneByKey({
        companyId,
        audience,
        key: forgotPasswordKey,
    });

    if (!fpSession) {
        throw new NotFoundError({ message: 'FORGOT PASSWORD SESSION IS NOT FOUND !!!' });
    }

    if (Date.now() - fpSession.createdAt > ONE_DAY_MS) {
        throw new RequestTimeoutError({ message: 'FORGOT PASSWORD SESSION IS EXPIRED !!!' });
    }

    /** set new password */
    await forgotPasswordService.resetByKey({ key: forgotPasswordKey });
    await userService.setPasswordByEmail({ password, companyId, email: fpSession.email });

    res.sendStatus(httpStatusCodes.NO_CONTENT);
};

module.exports = {
    forgotPassword,
    setPassword,
};
