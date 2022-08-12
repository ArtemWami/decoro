const { UserInvitation } = require('../../../models');

const removeUserInvitation = {
    one: {
        byUserId: ({ userId }) => UserInvitation.destroy({ where: { userId }, force: true })
    }
}

module.exports = {
    removeUserInvitation
}
