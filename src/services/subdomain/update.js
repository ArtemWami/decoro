const { Subdomain } = require('../../../models');
const subdomainsCacheService = require('../cache/subdomains');

const updateSubdomain = {
    one: {
        bySubdomainId: async ({ subdomainId }, { name }) => {
            const subdomain = await Subdomain.findOne({ where: { subdomainId } });
            const result = await Subdomain.update({ name }, { where: { subdomainId } });
            subdomainsCacheService.resetSubdomainsCache(subdomain);
            return result;
        },
    },
};

module.exports = {
    updateSubdomain,
};
