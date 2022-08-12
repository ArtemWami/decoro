const { FinishTypePaletteImage } = require('../../../models');
const { omitUndefined } = require('../../helpers/model');

const findOneByImageId = ({
    imageId,
    finishTypeId,
    paletteId,
    buildingId,
    companyId,
    subdomainId,
}) =>
    FinishTypePaletteImage.findOne({
        where: {
            imageId,
            ...omitUndefined({ finishTypeId, paletteId, buildingId, companyId, subdomainId }),
        },
    });

module.exports = findOneByImageId;
