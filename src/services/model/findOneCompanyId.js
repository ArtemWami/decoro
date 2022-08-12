const { Model } = require('../../../models');

const findOneCompanyId = ({ modelId }) =>
    Model.findOne({ attributes: ['companyId'], where: { modelId } });

module.exports = findOneCompanyId;
