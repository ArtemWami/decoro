const { UserInvitation } = require('../../../models');

const verifyInvitation = async ({ userId }) => {
    return UserInvitation.update({ verify: true }, { where: { userId }});
}

module.exports = {
    verifyInvitation
}
