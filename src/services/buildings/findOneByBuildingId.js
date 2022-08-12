const { Buildings } = require('../../../models');
const { omitUndefined } = require('../../helpers/model');

const findOneByBuildingId = ({ buildingId, companyId, subdomainId }) =>
    Buildings.findOne({ where: { buildingId, ...omitUndefined({ companyId, subdomainId }) } });

module.exports = findOneByBuildingId;
