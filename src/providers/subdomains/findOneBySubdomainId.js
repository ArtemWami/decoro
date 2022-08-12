const cacheService = require('../../services/cache');
const subdomainService = require('../../services/subdomain');

const findOneBySubdomainId = async (subdomainId) => {
    const key = cacheService.subdomains.getFindOneBySubdomainIdKey({ subdomainId });
    const cachedData = cacheService.client.get(key);
    if (cachedData !== undefined) {
        return cachedData;
    }

    const subdomain = await subdomainService.findOneBySubdomainId({ subdomainId });
    if (!subdomain) {
        return null;
    }

    const data = subdomain.toJSON();
    cacheService.client.set(key, data);
    return data;
};

module.exports = findOneBySubdomainId;
