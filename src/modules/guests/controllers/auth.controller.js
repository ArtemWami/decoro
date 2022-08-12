const userService = require('../../../services/user');
const authService = require('../../../services/auth');
const companyService = require('../../../services/company');
const { comparePassword } = require('../../../helpers/users');
const { Company } = require('../../../../models');
const { BadRequestError } = require('../../../errors');

const login = async (req, res) => {
    const { companyId, status: companyStatus } = req.state.company;
    const { name: subdomainName } = req.state.subdomain;
    const { login, password, audience } = req.body;
    const user = await userService.findOneByEmail({ companyId, email: login, audience });
    if (!user) {
        throw new BadRequestError({ message: 'Invalid email or password' });
    }

    /** CHECK MATCH PASSWORD */
    const matched = await comparePassword(password, user.password);
    if (!matched) {
        throw new BadRequestError({ message: 'Invalid email or password' });
    }

    /** CREATE TOKEN */
    const { userId, email } = user;
    const accessToken = await authService.sign({ userId, email, subdomain: subdomainName });

    /** SET LAST LOGIN DATA */
    await userService.updateUser.one.byUserId({ userId }, { lastLogin: new Date() });
    if (companyStatus === Company.STATUS.INACTIVE) {
        await companyService.updateCompany.one.byCompanyId(
            { companyId },
            { status: Company.STATUS.ACTIVE }
        );
    }

    res.json({ accessToken });
};

module.exports = {
    login,
};
