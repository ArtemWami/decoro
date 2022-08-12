const { FinishTypePaletteImage } = require('../../../models');

const create = ({
    finishTypeId,
    paletteId,
    type,
    key,
    location,
    size,
    buildingId,
    companyId,
    subdomainId,
    createdBy,
}) => {
    return FinishTypePaletteImage.create({
        finishTypeId,
        paletteId,
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
