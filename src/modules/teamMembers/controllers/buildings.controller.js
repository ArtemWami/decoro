const buildingsController = require('../../admins/controllers/buildings.controller');
const buildingService = require('../../../services/buildings');

const listingBuilding = async (req, res) => {
    const { limit, offset, search } = req.query;
    const { companyId } = req.state.user;
    const { buildingIds } = req.state;
    if (buildingIds.length === 0) {
        res.json({ data: [] });
        return;
    }

    const buildings = search
        ? await buildingService.findBuilding.all.searchInCompany({
              companyId,
              limit,
              offset,
              search,
              buildingId: buildingIds,
          })
        : await buildingService.findBuilding.all.byCompanyId({
              companyId,
              limit,
              offset,
              buildingId: buildingIds,
          });

    res.json({ data: buildings });
};

module.exports = {
    listingBuilding,
    getBuilding: buildingsController.getBuilding,
    findBuildingModels: buildingsController.findBuildingModels,
    findBuildingRooms: buildingsController.findBuildingRooms,
    updateBuilding: buildingsController.updateBuilding,
};
