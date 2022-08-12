const { Palette } = require('../../../models');

const findOneCompanyId = ({ paletteId }) =>
    Palette.findOne({ attributes: ['companyId'], where: { paletteId } });

module.exports = findOneCompanyId;
