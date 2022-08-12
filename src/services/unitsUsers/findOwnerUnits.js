const { UnitsUsers } = require('../../../models');

const findOwnerUnits = ({ unitIds, userId }) =>
    UnitsUsers.findAll({ where: { unitId: unitIds, userId } });

module.exports = findOwnerUnits;
