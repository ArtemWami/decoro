const { ModelRoom, Op } = require('../../../models');

const findAllByBuildingId = ({ buildingId }) =>
    ModelRoom.findAll({ where: { buildingId } });

const findAllByModelIds = ({ modelIds }) =>
    ModelRoom.findAll({ where: { modelId: { [Op.in]: modelIds } } });

module.exports = { findAllByBuildingId, findAllByModelIds };
