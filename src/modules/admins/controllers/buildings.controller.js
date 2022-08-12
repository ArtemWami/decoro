const httpStatusCodes = require('http-status-codes');
const { manager } = require('../../../base/cron');
const { processBeginningOfCampaign } = require('../../../cron');
const buildingService = require('../../../services/buildings');
const { Buildings } = require('../../../../models');
const { ConflictError, NotFoundError } = require('../../../errors');

const buildingImagesController = require('./buildingImages.controller');

const create = async (req, res) => {
    /** save building info */
    const { name, address, city, province, postalCode } = req.body;
    const { userId } = req.state.user;
    const { companyId } = req.state.company;
    const { subdomainId } = req.state.subdomain;
    const building = await buildingService.createBuildings({
        name,
        address,
        city,
        province,
        postalCode,
        companyId,
        subdomainId,
        createdBy: userId,
    });

    const { buildingId } = building;

    /** save image info */
    if (req.file) {
        req.params.buildingId = buildingId;
        await buildingImagesController.create(req);
    }

    const savedBuilding = await buildingService.findBuilding.one.byBuildingId({ buildingId });
    res.json({ data: savedBuilding });
};

const listingBuilding = async (req, res) => {
    const { limit, offset, search } = req.query;
    const { companyId } = req.state.company;

    const buildings = search
        ? await buildingService.findBuilding.all.searchInCompany({
              companyId,
              limit,
              offset,
              search,
          })
        : await buildingService.findBuilding.all.byCompanyId({
              companyId,
              limit,
              offset,
          });
    res.json({ data: buildings });
};

/** BUILDING WITH MODELS */
const findBuildingModels = async (req, res) => {
    const { buildingId } = req.params;
    const { name = '' } = req.query;
    const building = await buildingService.findBuilding.one.findOneWithModels({
        buildingId,
        name,
    });

    res.json({ data: building });
};

/** BUILDING WITH ROOMS */
const findBuildingRooms = async (req, res) => {
    const { buildingId } = req.params;
    const building = await buildingService.findBuilding.one.findOneWithRooms({
        buildingId,
    });

    res.json({ data: building });
};

const getBuilding = async (req, res) => {
    const { buildingId } = req.params;
    const building = await buildingService.findBuilding.one.byBuildingId({
        buildingId,
    });

    res.json({ data: building });
};

const updateBuilding = async (req, res) => {
    const { buildingId } = req.params;
    const { userId } = req.state.user;
    const { name, address, city, province, postalCode } = req.body;
    await buildingService.update({
        buildingId,
        name,
        address,
        city,
        province,
        postalCode,
        updatedBy: userId,
    });

    const building = await buildingService.findBuilding.one.byBuildingId({
        buildingId,
    });

    res.json({ data: building });
};

const removeBuilding = async (req, res) => {
    const { buildingId } = req.params;
    await buildingService.removeBuildings.one.byBuildingId({ buildingId });
    res.json({ msg: 'BUILDING IS REMOVED' });
};

/**
 * ASSIGN USER TO BUILDING
 * */
const assignUserToBuilding = async (req, res) => {
    const { buildingId, userIds = [] } = req.body;

    /** remove old assign team-members */
    const currentBuilding = await buildingService.findBuilding.one.byIdWithUsers({ buildingId });
    const currentUsers = currentBuilding.user || [];

    const currentUsersAssign = currentUsers.map((currentUser) => {
        const { userId } = currentUser;
        return buildingService.reAssignUserToBuilding({ userId, buildingId });
    });

    await Promise.all(currentUsersAssign);

    /** assign team-members */
    const assignedUsers = userIds.map((userId) => {
        return buildingService.assignUserToBuilding({ userId, buildingId });
    });

    await Promise.all(assignedUsers);

    /** GET CURRENT BUILDING INFO */
    const updatedBuilding = await buildingService.findBuilding.one.byIdWithUsers({
        buildingId,
    });

    res.json({ data: 'USER IS ASSIGNED', updatedBuilding });
};

/**
 * REMOVE ASSIGN USER TO BUILDING
 * */
const reAssignUserToBuilding = async (req, res) => {
    const { buildingId, userId } = req.body;

    const checkAssign = await buildingService.checkAssignUserToBuilding({ buildingId, userId });
    if (!checkAssign)
        throw new ConflictError({
            message: `USER ${userId} IS NOT ASSIGN TO BUILDING ${buildingId}`,
        });

    await buildingService.reAssignUserToBuilding({ userId, buildingId });
    res.json({ data: 'REMOVE ASSIGN' });
};

const startCampaign = async (req, res) => {
    const { buildingId } = req.params;
    const { companyId } = req.state.company;
    const building = await buildingService.findOneByBuildingId({ buildingId, companyId });
    if (!building) {
        throw new NotFoundError({ message: 'Building not found' });
    }

    if (building.status !== Buildings.STATUS.DRAFT) {
        throw new ConflictError({ message: 'Building has invalid status' });
    }

    await buildingService.updateByBuildingId(
        { buildingId },
        { status: Buildings.STATUS.IN_PROGRESS, campaignStartedAt: new Date() }
    );

    const run = manager.manage(processBeginningOfCampaign.onTick);
    run(); // run background task

    res.sendStatus(httpStatusCodes.NO_CONTENT);
};

module.exports = {
    create,
    listingBuilding,
    getBuilding,
    findBuildingModels,
    findBuildingRooms,
    updateBuilding,
    removeBuilding,
    assignUserToBuilding,
    reAssignUserToBuilding,
    startCampaign,
};
