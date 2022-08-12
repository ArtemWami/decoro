const { Model } = require('../../../models');
const { omitUndefined } = require('../../helpers/model');

const findAllByModelIds = ({ modelIds, companyId, subdomainId, buildingId }) =>
    Model.findAll({
        where: { modelId: modelIds, ...omitUndefined({ companyId, subdomainId, buildingId }) },
    });

module.exports = findAllByModelIds;
