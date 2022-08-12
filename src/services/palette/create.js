const { Palette } = require('../../../models');

const createPalette = ({ name, description, buildingId, companyId, subdomainId }) =>
    Palette.create({ name, description, buildingId, companyId, subdomainId });

module.exports = { createPalette };
