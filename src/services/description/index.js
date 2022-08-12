const { createDescription } = require('./create');
const { findDescription } = require('./find');
const findOneBuildingId = require('./findOneBuildingId');
const findOneCompanyId = require('./findOneCompanyId');
const { updateDescription } = require('./update');
const { removeDescription } = require('./remove');

module.exports = {
    createDescription,
    findDescription,
    findOneBuildingId,
    findOneCompanyId,
    updateDescription,
    removeDescription,
};
