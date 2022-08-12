const { BuildingImage } = require('../../../models');
const { omitUndefined } = require('../../helpers/model');

const findOneByType = ({ type, buildingId, companyId, subdomainId }) =>
    BuildingImage.findOne({
        where: { type, buildingId, ...omitUndefined({ companyId, subdomainId }) },
    });

module.exports = findOneByType;
