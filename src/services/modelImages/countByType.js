const { ModelImage } = require('../../../models');
const { omitUndefined } = require('../../helpers/model');

const countByType = ({ type, modelId, buildingId, companyId, subdomainId }) =>
    ModelImage.count({
        where: { type, modelId, ...omitUndefined({ buildingId, companyId, subdomainId }) },
    });

module.exports = countByType;
