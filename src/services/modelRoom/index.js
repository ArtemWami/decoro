const bulkCreate = require('./bulkCreate');
const destroy = require('./destroy');
const { findAllByBuildingId, findAllByModelIds } = require('./find');

module.exports = {
    bulkCreate,
    destroy,
    findAllByBuildingId,
    findAllByModelIds
};
