const { FinishTypePaletteImage } = require('../../../models');
const { omitUndefined } = require('../../helpers/model');

const findOneByType = ({ type, finishTypeId, paletteId, companyId, subdomainId }) =>
    FinishTypePaletteImage.findOne({
        where: { type, finishTypeId, paletteId, ...omitUndefined({ companyId, subdomainId }) },
    });

module.exports = findOneByType;
