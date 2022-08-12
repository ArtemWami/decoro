const optionsService = require('../../../services/options');
const buildingService = require('../../../services/buildings');
const roomService = require('../../../services/room');
const { BadRequestError, NotFoundError } = require('../../../errors');

const checkOptionKeyParams = async ({ roomId }) => {
    if (!roomId) throw new NotFoundError({ message: 'KEY IS (buildingId or roomId) IS NOT EXIST' });

    /** Check room */
    const roomCount = await roomService.countRoomById({ roomId });
    if (roomCount === 0) throw new BadRequestError({ message: 'ROOM IS NOT EXIST' });
};

const createOptions = async (req, res) => {
    const { name, buildingId, roomId } = req.body;

    /** Check building and room */
    await checkOptionKeyParams({ roomId });

    /** Check exist option */
    const optionCount = await optionsService.countOptionDuplicate({ buildingId, roomId, name });
    if (optionCount > 0) throw new BadRequestError({ message: 'OPTION IS EXIST' });

    /** Create option */
    const { companyId } = req.state.company;
    const { subdomainId } = req.state.subdomain;
    const option = await optionsService.createOptions({
        name,
        roomId,
        buildingId,
        companyId,
        subdomainId,
    });

    /** Get creation info */
    const { optionsId } = option;
    const optionSaved = await optionsService.findOptions.one.byOptionsId({ optionsId });
    res.json({ data: optionSaved });
};

const getAllOptions = async (req, res) => {
    const { buildingId, roomId } = req.query;

    /** Check building and room */
    await checkOptionKeyParams({ roomId });

    const options = await optionsService.findOptions.all.listByBuildAndRoomId({
        buildingId,
        roomId,
    });
    res.json({ data: options });
};

const getOneOption = async (req, res) => {
    const { optionsId } = req.params;
    const option = await optionsService.findOptions.one.byOptionsId({ optionsId });
    res.json({ data: option });
};

const updateOptions = async (req, res) => {
    const { optionsId } = req.params;
    const { name } = req.body;
    await optionsService.updateOptions.one.byOptionsId({ optionsId }, { name });
    const option = await optionsService.findOptions.one.byOptionsId({ optionsId });
    res.json({ data: option });
};

const removeOptions = async (req, res) => {
    const { optionsId } = req.params;
    await optionsService.removeOptions.one.byOptionsId({ optionsId });
    res.json({ data: 'OPTION IS REMOVED' });
};

module.exports = {
    createOptions,
    getAllOptions,
    getOneOption,
    updateOptions,
    removeOptions,
};
