const { ForgotPassword, User } = require('../../../models');
const { omitUndefined } = require('../../helpers/model');

const findOneByKey = ({ key, companyId, subdomainId, audience }) => {
    const role = User.ROLE_BY_AUDIENCE[audience];
    if (!role) {
        return null;
    }

    return ForgotPassword.findOne({
        where: { key, reset: false, ...omitUndefined({ companyId, subdomainId }) },
        include: [{ model: User, as: 'createdByUser', where: { role } }],
    });
};

module.exports = findOneByKey;
