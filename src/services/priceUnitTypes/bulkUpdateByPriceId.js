const { PriceUnitType } = require('../../../models');
const { getChangedData } = require('../../base/model');

const bulkCreate = require('./bulkCreate');
const { selectUnitType } = require('../../helpers/selectors');

const bulkUpdateByPriceId = async (priceId, priceUnitTypes, data, { transaction } = {}) => {
    const { deletedModels, createdData } = getChangedData(priceUnitTypes, data, 'unitType');
    const unitType = deletedModels.map(selectUnitType);
    await Promise.all([
        PriceUnitType.destroy({ force: true, where: { priceId, unitType }, transaction }),
        bulkCreate(createdData, transaction),
    ]);
};

module.exports = bulkUpdateByPriceId;
