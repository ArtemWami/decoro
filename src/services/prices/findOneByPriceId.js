const { Price, PriceModel, PriceUnitType } = require('../../../models');
const { omitUndefined } = require('../../helpers/model');

const findOneByPriceId = ({ priceId, companyId, subdomainId, buildingId }) =>
    Price.findOne({
        include: [
            { model: PriceModel, as: 'priceModels' },
            { model: PriceUnitType, as: 'priceUnitTypes' },
        ],
        where: { priceId, ...omitUndefined({ companyId, subdomainId, buildingId }) },
    });

module.exports = findOneByPriceId;
