const { Company } = require('../../../models');
const companiesCacheService = require('../cache/companies');

const removeCompany = {
    one: {
        byCompanyId: async ({ companyId }) => {
            const company = await Company.findOne({ where: { companyId } });
            const result = await Company.destroy({ where: { companyId }, force: true });
            companiesCacheService.resetCompaniesCache(company);
            return result;
        },
    },
};

module.exports = {
    removeCompany,
};
