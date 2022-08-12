const { PaletteLocation } = require('../../../models');

const findOneCompanyId = ({ paletteLocationId }) =>
    PaletteLocation.findOne({ attributes: ['companyId'], where: { paletteLocationId } });

module.exports = findOneCompanyId;
