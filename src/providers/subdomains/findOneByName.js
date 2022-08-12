const cacheService = require('../../services/cache');
const subdomainService = require('../../services/subdomain');

const findOneByName = async (name) => {
    const key = cacheService.subdomains.getFindOneByNameKey({ name });
    const cachedData = cacheService.client.get(key);
    if (cachedData !== undefined) {
        return cachedData;
    }

    const subdomain = await subdomainService.findOneByName({ name });
    if (!subdomain) {
        return null;
    }

    const data = subdomain.toJSON();
    cacheService.client.set(key, data);
    return data;
};

module.exports = findOneByName;
