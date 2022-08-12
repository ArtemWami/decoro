const { Palette } = require('../../../models');
const { omitUndefined } = require('../../helpers/model');

const findAllByPaletteIds = ({ paletteIds, companyId, subdomainId, buildingId }) =>
    Palette.findAll({
        where: { paletteId: paletteIds, ...omitUndefined({ companyId, subdomainId, buildingId }) },
    });

module.exports = findAllByPaletteIds;
