const pick = (key) => (obj) => obj[key];

const selectBuildingId = pick('buildingId');
const selectModelId = pick('modelId');
const selectRoomId = pick('roomId');
const selectPaletteId = pick('paletteId');
const selectUnitType = pick('unitType');

module.exports = {
    pick,
    selectBuildingId,
    selectModelId,
    selectRoomId,
    selectPaletteId,
    selectUnitType,
};
