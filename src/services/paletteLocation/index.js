const bulkCreate = require('../paletteLocation/bulkCreate');
const { createPaletteLocation } = require('../paletteLocation/create');
const createByPaletteId = require('../paletteLocation/createByPaletteId');
const { findPaletteLocation } = require('../paletteLocation/find');
const findOneBuildingId = require('../paletteLocation/findOneBuildingId');
const findOneCompanyId = require('../paletteLocation/findOneCompanyId');
const { updatePaletteLocation } = require('../paletteLocation/update');
const { removePaletteLocation } = require('../paletteLocation/remove');

module.exports = {
    bulkCreate,
    createPaletteLocation,
    createByPaletteId,
    findPaletteLocation,
    findOneBuildingId,
    findOneCompanyId,
    updatePaletteLocation,
    removePaletteLocation,
};
