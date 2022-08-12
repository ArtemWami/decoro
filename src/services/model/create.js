const { Model } = require('../../../models');

const createModel = ({
    name,
    interiorSqFt,
    exteriorSqFt,
    buildingId,
    bedrooms,
    den,
    bathrooms,
    companyId,
    subdomainId,
}) => {
    return Model.create({
        name,
        interiorSqFt,
        exteriorSqFt,
        buildingId,
        bedrooms,
        den,
        bathrooms,
        companyId,
        subdomainId,
    });
};

module.exports = { createModel };
