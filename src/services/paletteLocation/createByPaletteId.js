const { PaletteLocation } = require('../../../models');
const bulkCreate = require('./bulkCreate');

const createByPaletteId = ({ paletteId, buildingId, companyId, subdomainId }) =>
    bulkCreate([
        {
            paletteId,
            buildingId,
            companyId,
            subdomainId,
            name: PaletteLocation.DEFAULT_NAMES.Floor,
        },
        {
            paletteId,
            buildingId,
            companyId,
            subdomainId,
            name: PaletteLocation.DEFAULT_NAMES.Countertop,
        },
        {
            paletteId,
            buildingId,
            companyId,
            subdomainId,
            name: PaletteLocation.DEFAULT_NAMES.Tile,
        },
    ]);

module.exports = createByPaletteId;
