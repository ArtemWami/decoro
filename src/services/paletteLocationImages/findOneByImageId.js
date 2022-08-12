const { PaletteLocationImage } = require('../../../models');
const { omitUndefined } = require('../../helpers/model');

const findOneByImageId = ({ imageId, paletteLocationId, buildingId, companyId, subdomainId }) =>
    PaletteLocationImage.findOne({
        where: {
            imageId,
            ...omitUndefined({ paletteLocationId, buildingId, companyId, subdomainId }),
        },
    });

module.exports = findOneByImageId;
