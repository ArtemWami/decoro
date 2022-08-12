const { Units } = require('../../../models');

const findOneCompanyId = ({ unitId }) =>
    Units.findOne({ attributes: ['companyId'], where: { unitId } });

module.exports = findOneCompanyId;
