const { FinishTypePalette } = require('../../../models');

const getRecord = ({ finishTypeId, paletteId, companyId, subdomainId, buildingId, createdBy }) => ({
    finishTypeId,
    paletteId,
    companyId,
    subdomainId,
    buildingId,
    createdBy,
});

const bulkCreate = (data, { transaction } = {}) =>
    FinishTypePalette.bulkCreate(data.map(getRecord), { transaction });

module.exports = bulkCreate;
