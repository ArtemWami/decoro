const { BuildingRoom } = require('../../../models');

const bulkCreate = (data) => BuildingRoom.bulkCreate(data, { returning: false });

module.exports = bulkCreate;
