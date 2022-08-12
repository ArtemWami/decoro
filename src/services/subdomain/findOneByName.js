const { Subdomain } = require('../../../models');

const findOneByName = ({ name, attributes = Subdomain.attributes.base }) =>
    Subdomain.findOne({ where: { name }, attributes });

module.exports = findOneByName;
