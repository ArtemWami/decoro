const { PaletteLocation } = require('../../../models');

const createPaletteLocation = ({ paletteId, name }) => PaletteLocation.create({ paletteId, name });

module.exports = { createPaletteLocation };
