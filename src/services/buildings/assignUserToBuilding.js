const { UserBuilding } = require('../../../models');

const assignUserToBuilding = ({ userId, buildingId }) =>
    UserBuilding.create({ userId, buildingId });

module.exports = { assignUserToBuilding };
