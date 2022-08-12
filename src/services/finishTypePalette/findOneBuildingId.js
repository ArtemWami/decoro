const { FinishTypePalette } = require('../../../models');

const findOneBuildingId = ({ finishTypeId, paletteId }) =>
    FinishTypePalette.findOne({ attributes: ['buildingId'], where: { finishTypeId, paletteId } });

module.exports = findOneBuildingId;
