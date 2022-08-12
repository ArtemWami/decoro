const { PaletteLocation } = require('../../../models');

const findOneBuildingId = ({ paletteLocationId }) =>
    PaletteLocation.findOne({ attributes: ['buildingId'], where: { paletteLocationId } });

module.exports = findOneBuildingId;
