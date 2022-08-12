const { User } = require('../../../../models');
const userService = require('../../../services/user');
const { apiVersionByRole } = require('../../versions');

const findUserDataByRole = (user) => {
    switch (user.role) {
        case User.ROLE.MASTER: {
            return userService.findUser.one.byUserIdIdentify({ userId: user.userId });
        }

        case User.ROLE.ADMIN: {
            return userService.findIdentifyAdmin({ userId: user.userId });
        }

        case User.ROLE.ADMIN_MANAGER:
        case User.ROLE.TEAM_MEMBER: {
            return userService.findIdentity({ userId: user.userId });
        }

        default: {
            return user;
        }
    }
};

/**
 * Get user data
 * */
const getIdentity = async (req, res) => {
    const user = await findUserDataByRole(req.state.user);
    const api = apiVersionByRole[user.role] || apiVersionByRole[User.ROLE.GUEST];
    res.json({ api, data: user });
};

module.exports = {
    getIdentity,
};
