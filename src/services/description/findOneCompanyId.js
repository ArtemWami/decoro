const { Description } = require('../../../models');

const findOneCompanyId = ({ descriptionId }) =>
    Description.findOne({ attributes: ['companyId'], where: { descriptionId } });

module.exports = findOneCompanyId;
