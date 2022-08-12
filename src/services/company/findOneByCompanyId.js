const { Company } = require('../../../models');

const findOneByCompanyId = ({ companyId, attributes = Company.attributes.base }) =>
    Company.findOne({ where: { companyId }, attributes });

module.exports = findOneByCompanyId;
