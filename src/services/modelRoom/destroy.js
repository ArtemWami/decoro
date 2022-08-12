const { ModelRoom } = require('../../../models');

const destroy = ({ modelId, roomId }) =>
    ModelRoom.destroy({ where: { modelId, ...(roomId && { roomId }) }, force: true });

module.exports = destroy;
