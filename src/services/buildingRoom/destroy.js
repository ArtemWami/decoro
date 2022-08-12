const { BuildingRoom } = require('../../../models');

const destroy = ({ buildingId, roomId }) =>
    BuildingRoom.destroy({ where: { buildingId, ...(roomId && { roomId }) }, force: true });

module.exports = destroy;
