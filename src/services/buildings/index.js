const { createBuildings } = require('./create');
const { findBuilding, countBuildingById } = require('./find');
const findOneByBuildingId = require('./findOneByBuildingId');
const findOneCompanyId = require('./findOneCompanyId');
const { removeBuildings } = require('./remove');
const { update } = require('./update');
const updateByBuildingId = require('./updateByBuildingId');
const { assignUserToBuilding } = require('./assignUserToBuilding');
const { reAssignUserToBuilding } = require('./removeAssignUserToBuilding');
const { checkAssignUserToBuilding } = require('./checkAssignUserToBuilding');

module.exports = {
    createBuildings,
    findBuilding,
    findOneByBuildingId,
    findOneCompanyId,
    countBuildingById,
    removeBuildings,
    update,
    updateByBuildingId,
    assignUserToBuilding,
    reAssignUserToBuilding,
    checkAssignUserToBuilding,
};
