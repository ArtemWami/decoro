const { UserInvitation } = require('../../../models');

const findUserInvitation = {
    all: {
        list: () => UserInvitation.findAll(),
    },
    one: {
        byUserId: ({ userId, attributes = UserInvitation.attributes.base }) =>
            UserInvitation.findOne({ where: { userId }, attributes }),
        byInvitationKey: ({ invitationKey, attributes = UserInvitation.attributes.base }) =>
            UserInvitation.findOne({ where: { key: invitationKey }, attributes }),
        byEmail: ({ email, attributes = UserInvitation.attributes.base }) =>
            UserInvitation.findOne({ where: { email }, attributes }),
    }
}

module.exports = {
    findUserInvitation
}
