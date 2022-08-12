const { UserBuilding } = require('../../../models');

const count = ({ userId, buildingId }) => UserBuilding.count({ where: { userId, buildingId } });

module.exports = count;
