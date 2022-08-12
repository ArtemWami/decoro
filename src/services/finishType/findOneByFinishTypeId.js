const { FinishType, FinishTypePalette } = require('../../../models');
const { omitUndefined } = require('../../helpers/model');

const findOneByFinishTypeId = ({ finishTypeId, companyId, subdomainId, buildingId }) =>
    FinishType.findOne({
        include: [{ model: FinishTypePalette, as: 'finishTypePalettes' }],
        where: { finishTypeId, ...omitUndefined({ companyId, subdomainId, buildingId }) },
    });

module.exports = findOneByFinishTypeId;
