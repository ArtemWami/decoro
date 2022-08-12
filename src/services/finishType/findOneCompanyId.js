const { FinishType } = require('../../../models');

const findOneCompanyId = ({ finishTypeId }) =>
    FinishType.findOne({ attributes: ['companyId'], where: { finishTypeId } });

module.exports = findOneCompanyId;
