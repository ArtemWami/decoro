const { Units } = require('../../../models');

const findAllCompanyIds = ({ unitIds }) =>
    Units.findAll({ attributes: ['companyId'], where: { unitId: unitIds } });

module.exports = findAllCompanyIds;
