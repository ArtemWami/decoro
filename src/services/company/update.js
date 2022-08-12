const { Company } = require('../../../models');
const companiesCacheService = require('../cache/companies');

const updateCompany = {
    one: {
        byCompanyId: async (
            { companyId },
            {
                companyName,
                address,
                city,
                province,
                postalCode,
                country,
                phone,
                email,
                status,
                primaryColor,
                textColor,
                updatedBy,
            }
        ) => {
            const company = await Company.findOne({ where: { companyId } });
            const result = await Company.update(
                {
                    companyName,
                    address,
                    city,
                    province,
                    postalCode,
                    country,
                    phone,
                    email,
                    status,
                    primaryColor,
                    textColor,
                    updatedBy,
                },
                { where: { companyId } }
            );

            companiesCacheService.resetCompaniesCache(company);
            return result;
        },
    },
};

module.exports = {
    updateCompany,
};
