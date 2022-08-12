const { Buildings } = require('../../../models');
const { omitUndefined } = require('../../helpers/model');

const updateByBuildingId = (
    { buildingId, companyId, subdomainId },
    { status, campaignStartedAt, campaignEndedAt, updatedBy }
) =>
    Buildings.update(
        { status, campaignStartedAt, campaignEndedAt, updatedBy },
        { where: { buildingId, ...omitUndefined({ companyId, subdomainId }) } }
    );

module.exports = updateByBuildingId;
