const { Company } = require('../../../models');

const findOneBySubdomainId = ({ subdomainId, attributes = Company.attributes.base }) =>
    Company.findOne({ where: { subdomainId }, attributes });

module.exports = findOneBySubdomainId;
