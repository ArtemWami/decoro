const { Options } = require('../../../models');

const findOneBuildingId = ({ optionsId }) =>
    Options.findOne({ attributes: ['buildingId'], where: { optionsId } });

module.exports = findOneBuildingId;
