const { PriceUnitType } = require('../../../models');

const getRecord = ({ priceId, unitType, companyId, subdomainId, buildingId, createdBy }) => ({
    priceId,
    unitType,
    companyId,
    subdomainId,
    buildingId,
    createdBy,
});

const bulkCreate = (data, { transaction } = {}) =>
    PriceUnitType.bulkCreate(data.map(getRecord), { transaction });

module.exports = bulkCreate;
