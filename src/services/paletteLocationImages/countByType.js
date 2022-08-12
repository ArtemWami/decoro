const { PaletteLocationImage } = require('../../../models');
const { omitUndefined } = require('../../helpers/model');

const countByType = ({ type, paletteLocationId, buildingId, companyId, subdomainId }) =>
    PaletteLocationImage.count({
        where: { type, paletteLocationId, ...omitUndefined({ buildingId, companyId, subdomainId }) },
    });

module.exports = countByType;
