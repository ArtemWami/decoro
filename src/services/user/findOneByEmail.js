const { User } = require('../../../models');
const { omitUndefined } = require('../../helpers/model');

// limit search by audience to support same email
const findOneByEmail = ({ email, companyId, subdomainId, audience }) => {
    const role = User.ROLE_BY_AUDIENCE[audience];
    if (!role) {
        return null;
    }

    return User.findOne({ where: { email, role, ...omitUndefined({ companyId, subdomainId }) } });
};

module.exports = findOneByEmail;
