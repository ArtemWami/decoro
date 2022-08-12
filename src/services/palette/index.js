const { createPalette } = require('./create');
const { findPalette } = require('./find');
const findAllByPaletteIds = require('./findAllByPaletteIds');
const findOneBuildingId = require('./findOneBuildingId');
const findOneCompanyId = require('./findOneCompanyId');
const { updatePalette } = require('./update');
const { removePalette } = require('./remove');

module.exports = {
    createPalette,
    findPalette,
    findAllByPaletteIds,
    findOneBuildingId,
    findOneCompanyId,
    updatePalette,
    removePalette,
};
