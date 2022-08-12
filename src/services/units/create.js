const { Units } = require('../../../models');

const createUnits = ({
    unitNumber,
    status,
    modelId,
    buildingId,
    type,
    cash,
    companyId,
    subdomainId,
}) => {
    return Units.create({
        unitNumber,
        status,
        modelId,
        buildingId,
        type,
        cash,
        companyId,
        subdomainId,
    });
};

module.exports = { createUnits };
