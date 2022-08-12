const { FinishTypePalette } = require('../../../models');
const { omitUndefined } = require('../../helpers/model');

const findOneByFinishTypePaletteId = ({ finishTypeId, paletteId, companyId, subdomainId, buildingId }) =>
    FinishTypePalette.findOne({
        where: {
            finishTypeId,
            paletteId,
            ...omitUndefined({ companyId, subdomainId, buildingId }),
        },
    });

module.exports = findOneByFinishTypePaletteId;
