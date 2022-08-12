const { ChangeEmailHandler, User } = require('../../../models');
const { omitUndefined } = require('../../helpers/model');

const find = {
    one: {
        byUserCompanyId: ({ userId, companyId }) =>
            ChangeEmailHandler.findOne({ where: { userId, companyId } }),
        byConfirmationKey: ({ confirmationKey, audience, companyId }) => {
            const role = User.ROLE_BY_AUDIENCE[audience];
            if (!role) {
                return null;
            }

            return ChangeEmailHandler.findOne({
                where: { confirmationKey, ...omitUndefined({ companyId }) },
                include: [{ model: User, as: 'user', where: { role } }],
            });
        },
        byCancelKey: ({ cancelKey, audience, companyId }) => {
            const role = User.ROLE_BY_AUDIENCE[audience];
            if (!role) {
                return null;
            }

            return ChangeEmailHandler.findOne({
                where: { cancelKey, ...omitUndefined({ companyId }) },
                include: [{ model: User, as: 'user', where: { role } }],
            });
        },
    },
};

module.exports = {
    find,
};
