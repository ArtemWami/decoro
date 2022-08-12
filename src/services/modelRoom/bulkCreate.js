const { ModelRoom } = require('../../../models');

const bulkCreate = (data) => ModelRoom.bulkCreate(data, { returning: false });

module.exports = bulkCreate;
