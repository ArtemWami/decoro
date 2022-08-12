const { FinishType } = require('../../../models');

const findOneBuildingId = ({ finishTypeId }) =>
    FinishType.findOne({ attributes: ['buildingId'], where: { finishTypeId } });

module.exports = findOneBuildingId;
