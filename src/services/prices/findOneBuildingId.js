const { Price } = require('../../../models');

const findOneBuildingId = ({ priceId }) =>
    Price.findOne({ attributes: ['buildingId'], where: { priceId } });

module.exports = findOneBuildingId;
