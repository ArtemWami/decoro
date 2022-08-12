const { BuildingImage } = require('../../../models');

const create = ({ buildingId, type, key, location, size, companyId, subdomainId, createdBy }) => {
    return BuildingImage.create({
        buildingId,
        type,
        key,
        location,
        size,
        companyId,
        subdomainId,
        createdBy,
    });
};

module.exports = create;
