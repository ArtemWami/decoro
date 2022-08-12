const { User } = require('../../../models');

const findOneCompanyId = ({ userId }) =>
    User.findOne({ attributes: ['companyId'], where: { userId } });

module.exports = findOneCompanyId;
