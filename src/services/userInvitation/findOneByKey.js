const { UserInvitation, User } = require('../../../models');
const { omitUndefined } = require('../../helpers/model');

const findOneByKey = ({ key, companyId, audience }) => {
    const role = User.ROLE_BY_AUDIENCE[audience];
    if (!role) {
        return null;
    }

    return UserInvitation.findOne({
        where: { key, ...omitUndefined({ companyId }) },
        include: [{ model: User, as: 'user', where: { role } }],
    });
};

module.exports = findOneByKey;
