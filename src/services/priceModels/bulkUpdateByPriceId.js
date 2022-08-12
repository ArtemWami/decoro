const { PriceModel } = require('../../../models');
const { getChangedData } = require('../../base/model');

const bulkCreate = require('./bulkCreate');
const { selectModelId } = require('../../helpers/selectors');

const bulkUpdateByPriceId = async (priceId, priceModels, data, { transaction } = {}) => {
    const { deletedModels, createdData } = getChangedData(priceModels, data, 'modelId');
    const modelId = deletedModels.map(selectModelId);
    await Promise.all([
        PriceModel.destroy({ force: true, where: { priceId, modelId }, transaction }),
        bulkCreate(createdData, transaction),
    ]);
};

module.exports = bulkUpdateByPriceId;
