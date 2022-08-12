const modelService = require('../../../services/model');
const modelRoomService = require('../../../services/modelRoom');
const buildingRoomService = require('../../../services/buildingRoom');
const optionService = require('../../../services/options');
const { NotFoundError } = require('../../../errors');

const removeRelatedOptions = async ({ roomIds, modelId }) => {
    /** GET REMOVED ROOMS */
    const currentModel = await modelService.findModel.one.byModelId({ modelId });
    const currentRooms = currentModel.rooms || [];
    const removedRooms = currentRooms.filter(( modelEx ) => {
        return roomIds.indexOf(modelEx.roomId) === -1
    });
    /** REMOVE RELATED OPTIONS BY roomId and buildingId */
    await removedRooms.forEach((room) => {
        optionService.removeOptions.one.byBuildingAndRoomId({
            buildingId: currentModel.buildingId,
            roomId: room.roomId
        });
    });
}

/**
 * Create model
 * */
const createModel = async (req, res) => {
    const { name, interiorSqFt, exteriorSqFt, buildingId, bedrooms, den, bathrooms } = req.body;
    const { companyId } = req.state.company;
    const { subdomainId } = req.state.subdomain;
    const { modelId } = await modelService.createModel({
        name,
        interiorSqFt,
        exteriorSqFt,
        buildingId,
        bedrooms,
        den,
        bathrooms,
        companyId,
        subdomainId,
    });

    /** update model name */
    const model = await modelService.findModel.one.byModelId({ modelId });

    res.json({ msg: 'MODEL CREATED', data: model });
};

/**
 * Get model by id
 * */
const getModel = async (req, res) => {
    const { modelId } = req.params;
    const model = await modelService.findModel.one.byModelId({ modelId });
    const data = model.toJSON();
    data.rooms = modelService.groupCompartments(data.rooms);
    res.json({ model: data });
};

const updateModelRooms = async (req, res) => {
    const { modelId } = req.params;
    const { roomIds } = req.body;

    await removeRelatedOptions({ roomIds, modelId });

    await modelRoomService.destroy({ modelId });
    if (roomIds.length > 0) {
        await modelRoomService.bulkCreate(roomIds.map((roomId) => ({ modelId, roomId })));
    }

    const model = await modelService.findModel.one.byModelId({ modelId });
    await buildingRoomService.onUpdateBuildingRooms({ buildingId: model.buildingId });
    res.json({ model });
};

/**
 * Update model
 * */
const updateModel = async (req, res) => {
    const { modelId } = req.params;
    const { name, interiorSqFt, exteriorSqFt, bedrooms, den, bathrooms } = req.body;

    /** update model name */
    await modelService.updateModel.one.byModelId(
        { modelId },
        {
            name,
            interiorSqFt,
            exteriorSqFt,
            bedrooms,
            den,
            bathrooms,
        }
    );
    const model = await modelService.findModel.one.byModelId({ modelId });

    res.json({ model });
};

/**
 * Remove model
 * */
const removeModel = async (req, res) => {
    const { modelId } = req.params;
    const model = await modelService.findModel.one.byModelId({ modelId });
    if (!model) {
        throw new NotFoundError();
    }

    await modelService.removeModel.one.byModelId({ modelId });
    await buildingRoomService.onUpdateBuildingRooms({ buildingId: model.buildingId });
    res.json({ msg: 'MODEL IS REMOVED' });
};

module.exports = {
    createModel,
    getModel,
    updateModel,
    removeModel,
    updateModelRooms,
};
