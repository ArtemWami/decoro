const { FinishType } = require('../../../models');
const { omitUndefined } = require('../../helpers/model');

const destroyByFinishTypeId = ({ finishTypeId, companyId, subdomainId, buildingId }) =>
    FinishType.destroy({
        force: true,
        where: { finishTypeId, ...omitUndefined({ companyId, subdomainId, buildingId }) },
    });

module.exports = destroyByFinishTypeId;
