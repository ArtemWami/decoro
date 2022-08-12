const { ModelImage } = require('../../../models');
const { omitUndefined } = require('../../helpers/model');

const destroyByImageId = ({ imageId, buildingId, companyId, subdomainId }) =>
    ModelImage.destroy({
        force: true,
        where: { imageId, ...omitUndefined({ buildingId, companyId, subdomainId }) },
    });

module.exports = destroyByImageId;
