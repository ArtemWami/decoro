const { UserBuilding } = require('../../../models');

const reAssignUserToBuilding = ({ userId, buildingId }) =>
    UserBuilding.destroy({ where: { userId, buildingId }, force: true });

module.exports = { reAssignUserToBuilding };
