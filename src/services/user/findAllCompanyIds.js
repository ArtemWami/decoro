const { User } = require('../../../models');

const findAllCompanyIds = ({ userIds }) =>
    User.findAll({ attributes: ['companyId'], where: { userId: userIds } });

module.exports = findAllCompanyIds;
