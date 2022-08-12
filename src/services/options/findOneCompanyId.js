const { Options } = require('../../../models');

const findOneCompanyId = ({ optionsId }) =>
    Options.findOne({ attributes: ['companyId'], where: { optionsId } });

module.exports = findOneCompanyId;
