const { UnitsUsers } = require('../../../models');

const findOne = ({ unitId, userId }) => UnitsUsers.findOne({ where: { unitId, userId } });

module.exports = findOne;
