const { PaletteLocation } = require('../../../models');

const getRecord = ({ paletteId, buildingId, companyId, subdomainId, name }) => ({
    paletteId,
    buildingId,
    companyId,
    subdomainId,
    name,
});

const bulkCreate = (data) => PaletteLocation.bulkCreate(data.map(getRecord));

module.exports = bulkCreate;
