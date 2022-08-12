const { Buildings } = require('../../../models');

const findOneCompanyId = ({ buildingId }) =>
    Buildings.findOne({ attributes: ['companyId'], where: { buildingId } });

module.exports = findOneCompanyId;
