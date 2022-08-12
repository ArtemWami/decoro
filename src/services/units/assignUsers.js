const { UnitsUsers } = require('../../../models');

const assignUnitsToUsers = ({ unitId, userId }) => UnitsUsers.create({ unitId, userId });

const reAssignUnitsToUsers = ({ unitId, userId }) =>
    UnitsUsers.destroy({ where: { unitId, userId }, force: true });

const checkAssign = ({ unitId, userId }) => UnitsUsers.findOne({ where: { unitId, userId } });

const countAssign = ({ userId }) => UnitsUsers.count({ where: { userId } });

module.exports = {
    assignUnitsToUsers,
    reAssignUnitsToUsers,
    checkAssign,
    countAssign
};
