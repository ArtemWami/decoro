const { Units } = require('../../../models');

const findOneBuildingId = ({ unitId }) =>
    Units.findOne({ attributes: ['buildingId'], where: { unitId } });

module.exports = findOneBuildingId;
