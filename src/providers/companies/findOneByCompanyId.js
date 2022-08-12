const cacheService = require('../../services/cache');
const companyService = require('../../services/company');

const findOneByCompanyId = async (companyId) => {
    const key = cacheService.companies.getFindOneByCompanyIdKey({ companyId });
    const cachedData = cacheService.client.get(key);
    if (cachedData !== undefined) {
        return cachedData;
    }

    const company = await companyService.findOneByCompanyId({ companyId });
    if (!company) {
        return null;
    }

    const data = company.toJSON();
    cacheService.client.set(key, data);
    return data;
};

module.exports = findOneByCompanyId;
