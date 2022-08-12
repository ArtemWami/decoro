const { PaletteLocationImage } = require('../../../models');

const create = ({
    paletteLocationId,
    type,
    key,
    location,
    size,
    buildingId,
    companyId,
    subdomainId,
    createdBy,
}) => {
    return PaletteLocationImage.create({
        paletteLocationId,
        type,
        key,
        location,
        size,
        buildingId,
        companyId,
        subdomainId,
        createdBy,
    });
};

module.exports = create;
