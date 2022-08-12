const { User } = require('../../../models');
const usersCacheService = require('../cache/users');

const updateUser = {
    one: {
        byUserId: async (
            { userId },
            {
                firstName,
                lastName,
                email,
                emailVerified,
                role,
                phone,
                languageCode,
                lastLogin,
                jobTitle,
                status,
            }
        ) => {
            const result = await User.update(
                {
                    firstName,
                    lastName,
                    email,
                    emailVerified,
                    role,
                    phone,
                    languageCode,
                    lastLogin,
                    jobTitle,
                    status,
                },
                { where: { userId } }
            );

            usersCacheService.resetUsersCache({ userId });
            return result;
        },
    },
};

module.exports = {
    updateUser,
};
