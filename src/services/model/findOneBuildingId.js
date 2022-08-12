const { Model } = require('../../../models');

const findOneBuildingId = ({ modelId }) =>
    Model.findOne({ attributes: ['buildingId'], where: { modelId } });

module.exports = findOneBuildingId;
