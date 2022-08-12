const { PriceModel } = require('../../../models');

const getRecord = ({ priceId, modelId, companyId, subdomainId, buildingId, createdBy }) => ({
    priceId,
    modelId,
    companyId,
    subdomainId,
    buildingId,
    createdBy,
});

const bulkCreate = (data, { transaction } = {}) =>
    PriceModel.bulkCreate(data.map(getRecord), { transaction });

module.exports = bulkCreate;
