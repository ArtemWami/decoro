const { Description } = require('../../../models');

const findOneBuildingId = ({ descriptionId }) =>
    Description.findOne({ attributes: ['buildingId'], where: { descriptionId } });

module.exports = findOneBuildingId;
