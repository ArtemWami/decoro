const { ForgotPassword } = require('../../../models');

const create = ({ email, key, reset, companyId, subdomainId, createdBy }) =>
    ForgotPassword.create({ email, key, reset, companyId, subdomainId, createdBy });

module.exports = create;
