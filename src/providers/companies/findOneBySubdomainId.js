const cacheService = require('../../services/cache');
const companyService = require('../../services/company');

const findOneBySubdomainId = async (subdomainId) => {
    const key = cacheService.companies.getFindOneBySubdomainIdKey({ subdomainId });
    const cachedData = cacheService.client.get(key);
    if (cachedData !== undefined) {
        return cachedData;
    }

    const company = await companyService.findOneBySubdomainId({ subdomainId });
    if (!company) {
        return null;
    }

    const data = company.toJSON();
    cacheService.client.set(key, data);
    return data;
};

module.exports = findOneBySubdomainId;
