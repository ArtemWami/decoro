const { Subdomain } = require('../../../models');

const findSubdomain = {
    all: {
        list: () => Subdomain.findAll(),
    },
    one: {
        bySubdomainId: ({ subdomainId, attributes = Subdomain.attributes.base }) =>
            Subdomain.findOne({ where: { subdomainId }, attributes }),
        bySubdomainName: ({ name, attributes = Subdomain.attributes.base }) =>
            Subdomain.findOne({ where: { name }, attributes }),
    },
};

module.exports = {
    findSubdomain,
};
