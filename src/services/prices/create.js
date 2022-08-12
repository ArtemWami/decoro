const { Price } = require('../../../models');

const create = (
    {
        finishTypeId,
        contractorPrice,
        lowerLevelUnitsPrice,
        lowerPenthousesPrice,
        upperPenthousesPrice,
        townhousesPrice,
        companyId,
        subdomainId,
        buildingId,
        createdBy,
    },
    { transaction } = {}
) =>
    Price.create(
        {
            finishTypeId,
            contractorPrice,
            lowerLevelUnitsPrice,
            lowerPenthousesPrice,
            upperPenthousesPrice,
            townhousesPrice,
            companyId,
            subdomainId,
            buildingId,
            createdBy,
        },
        { transaction }
    );

module.exports = create;
