const { ModelImage } = require('../../../models');
const { omitUndefined } = require('../../helpers/model');

const findOneByImageId = ({ imageId, modelId, buildingId, companyId, subdomainId }) =>
    ModelImage.findOne({
        where: { imageId, ...omitUndefined({ modelId, buildingId, companyId, subdomainId }) },
    });

module.exports = findOneByImageId;
