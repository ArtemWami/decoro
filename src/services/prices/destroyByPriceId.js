const { Price } = require('../../../models');
const { omitUndefined } = require('../../helpers/model');

const destroyByPriceId = ({ priceId, companyId, subdomainId, buildingId }) =>
    Price.destroy({
        force: true,
        where: { priceId, ...omitUndefined({ companyId, subdomainId, buildingId }) },
    });

module.exports = destroyByPriceId;
