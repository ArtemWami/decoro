const { Palette } = require('../../../models');

const findOneBuildingId = ({ paletteId }) =>
    Palette.findOne({ attributes: ['buildingId'], where: { paletteId } });

module.exports = findOneBuildingId;
