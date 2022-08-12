const { Price } = require('../../../models');

const findOneCompanyId = ({ priceId }) =>
    Price.findOne({ attributes: ['companyId'], where: { priceId } });

module.exports = findOneCompanyId;
