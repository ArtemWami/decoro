const { PaletteLocationImage } = require('../../../models');
const { omitUndefined } = require('../../helpers/model');

const destroyByImageId = ({ imageId, buildingId, companyId, subdomainId }) =>
    PaletteLocationImage.destroy({
        force: true,
        where: { imageId, ...omitUndefined({ buildingId, companyId, subdomainId }) },
    });

module.exports = destroyByImageId;
