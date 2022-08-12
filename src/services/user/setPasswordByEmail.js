const { User } = require('../../../models');
const { hashPassword } = require('../../helpers/users');
const { omitUndefined } = require('../../helpers/model');

const setPasswordByEmail = async ({ email, password, companyId, subdomainId }) => {
    const hashedPassword = await hashPassword(password);
    return User.update(
        { password: hashedPassword },
        { where: { email, ...omitUndefined({ companyId, subdomainId }) } }
    );
};

module.exports = setPasswordByEmail;
