const { BuildingImage } = require('../../../models');
const { omitUndefined } = require('../../helpers/model');

const findOneByImageId = ({ imageId, buildingId, companyId, subdomainId }) =>
    BuildingImage.findOne({
        where: { imageId, ...omitUndefined({ buildingId, companyId, subdomainId }) },
    });

module.exports = findOneByImageId;
