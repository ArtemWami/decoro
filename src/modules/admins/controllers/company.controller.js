const companyService = require('../../../services/company');

/**
 * Update company
 * */
const updateCompany = async (req, res) => {
    const { userId } = req.state.user;
    const { companyId } = req.state.company;
    const { companyName, address, city, province, postalCode, country, phone, email } = req.body;
    await companyService.updateCompany.one.byCompanyId(
        { companyId },
        {
            companyName,
            email,
            address,
            city,
            province,
            postalCode,
            country,
            phone,
            updatedBy: userId,
        }
    );

    const company = await companyService.findCompany.one.byCompanyId({ companyId });
    res.json({ data: company });
};

module.exports = {
    updateCompany,
};
