const { User } = require('../../../models');
const usersCacheService = require('../cache/users');

const removeUser = {
    one: {
        byUserId: async ({ userId }) => {
            const result = await User.destroy({ where: { userId }, force: true });
            usersCacheService.resetUsersCache({ userId });
            return result;
        },
    },
};

module.exports = {
    removeUser,
};
