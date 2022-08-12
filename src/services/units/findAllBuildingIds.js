const { Units } = require('../../../models');

const findAllBuildingIds = ({ unitIds }) =>
    Units.findAll({ attributes: ['buildingId'], where: { unitId: unitIds } });

module.exports = findAllBuildingIds;
