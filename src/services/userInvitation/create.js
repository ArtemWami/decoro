const { UserInvitation } = require('../../../models');

const createUserInvitation = ({ userId, email, key, verify, companyId, subdomainId }) =>
    UserInvitation.create({ userId, email, key, verify, companyId, subdomainId });

module.exports = { createUserInvitation };
