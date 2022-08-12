const { Subdomain } = require('../../../models');

const findOneBySubdomainId = ({ subdomainId, attributes = Subdomain.attributes.base }) =>
    Subdomain.findOne({ where: { subdomainId }, attributes });

module.exports = findOneBySubdomainId;
