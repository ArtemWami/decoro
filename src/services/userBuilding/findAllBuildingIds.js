const { UserBuilding } = require('../../../models');

const findAllBuildingIds = ({ userId }) =>
    UserBuilding.findAll({ attributes: ['buildingId'], where: { userId } });

module.exports = findAllBuildingIds;
