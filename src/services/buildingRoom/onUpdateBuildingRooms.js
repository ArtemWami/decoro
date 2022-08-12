const { Model, ModelRoom } = require('../../../models');
const { selectModelId, selectRoomId } = require('../../helpers/selectors');
const { unique } = require('../../helpers/arrays');

const bulkCreate = require('./bulkCreate');
const destroy = require('./destroy');

const onUpdateBuildingRooms = async ({ buildingId }) => {
    const models = await Model.findAll({ attributes: ['modelId'], where: { buildingId } });
    const modelIds = models.map(selectModelId);
    const modelRooms = await ModelRoom.findAll({
        attributes: ['roomId'],
        where: { modelId: modelIds },
    });

    const roomIds = modelRooms.map(selectRoomId);
    const buildingRooms = unique(roomIds).map((roomId) => ({ buildingId, roomId }));
    await destroy({ buildingId });
    if (buildingRooms.length > 0) {
        await bulkCreate(buildingRooms);
    }
};

module.exports = onUpdateBuildingRooms;
