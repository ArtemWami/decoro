const companyService = require('../../../services/company');

const getBranding = async (req, res) => {
    const { subdomainId } = req.state.subdomain;
    const company = await companyService.findCompany.one.bySubdomainId({ subdomainId });
    const { primaryColor, textColor } = company;
    const images = company.images.map(({ imageId, type, location }) => ({
        imageId,
        type,
        location,
    }));

    res.json({ primaryColor, textColor, images });
};

module.exports = {
    getBranding,
};
