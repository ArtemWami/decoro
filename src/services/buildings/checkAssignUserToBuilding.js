const { UserBuilding } = require('../../../models');

const checkAssignUserToBuilding = ({ userId, buildingId }) =>
    UserBuilding.findOne({ where: { userId, buildingId }});

module.exports = { checkAssignUserToBuilding };
