const { Subdomain } = require('../../../models');
const subdomainsCacheService = require('../cache/subdomains');

const removeSubdomain = {
    one: {
        bySubdomainId: async ({ subdomainId }) => {
            const subdomain = await Subdomain.findOne({ where: { subdomainId } });
            const result = await Subdomain.destroy({ where: { subdomainId }, force: true });
            subdomainsCacheService.resetSubdomainsCache(subdomain);
            return result;
        },
    },
};

module.exports = {
    removeSubdomain,
};
