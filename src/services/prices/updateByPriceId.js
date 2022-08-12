const { Price } = require('../../../models');

const updateByPriceId = (
    priceId,
    {
        contractorPrice,
        lowerLevelUnitsPrice,
        lowerPenthousesPrice,
        upperPenthousesPrice,
        townhousesPrice,
        updatedBy,
    },
    { transaction } = {}
) =>
    Price.update(
        {
            contractorPrice,
            lowerLevelUnitsPrice,
            lowerPenthousesPrice,
            upperPenthousesPrice,
            townhousesPrice,
            updatedBy,
        },
        { where: { priceId }, transaction }
    );

module.exports = updateByPriceId;
