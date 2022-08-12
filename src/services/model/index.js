const { createModel } = require('./create');
const { findModel, findModelsByBuildingId } = require('./find');
const findAllByModelIds = require('./findAllByModelIds');
const findOneBuildingId = require('./findOneBuildingId');
const findOneCompanyId = require('./findOneCompanyId');
const groupCompartments = require('./groupCompartments');
const { updateModel } = require('./update');
const { removeModel } = require('./remove');

module.exports = {
    createModel,
    groupCompartments,
    findModel,
    findAllByModelIds,
    findOneBuildingId,
    findOneCompanyId,
    findModelsByBuildingId,
    updateModel,
    removeModel,
};
