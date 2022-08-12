const userBuildingService = require('../../../services/userBuilding');
const modelService = require('../../../services/model');
const optionsService = require('../../../services/options');
const paletteService = require('../../../services/palette');
const paletteLocationService = require('../../../services/paletteLocation');
const unitsService = require('../../../services/units');
const descriptionService = require('../../../services/description');
const finishTypeService = require('../../../services/finishType');
const pricesService = require('../../../services/prices');
const unitsUsersService = require('../../../services/unitsUsers');
const userService = require('../../../services/user');
const { ForbiddenError, NotFoundError, BadRequestError } = require('../../../errors');
const { wrap } = require('../../../base/middleware');
const { updateRequestState } = require('../../../helpers/middleware');
const { isID } = require('../../../helpers/middleware');

const checkUserBuilding = async (user, { buildingId }) => {
    const count = await userBuildingService.count({ userId: user.userId, buildingId });
    if (count === 0) {
        throw new ForbiddenError();
    }
};

const checkUserBuildings = async (user, { buildingIds }) => {
    const uniqueBuildingIds = [...new Set(buildingIds)];
    const count = await userBuildingService.count({ userId: user.userId, buildingId: buildingIds });
    if (count !== uniqueBuildingIds.length) {
        throw new ForbiddenError();
    }
};

const provideUserBuildingIds = wrap(async (req) => {
    const { userId } = req.state.user;
    const userBuildings = await userBuildingService.findAllBuildingIds({
        userId,
    });

    const buildingIds = userBuildings.map(({ buildingId }) => buildingId);
    updateRequestState(req, { buildingIds });
});

const checkBuildingPermission = (getBuildingId) =>
    wrap(async (req) => {
        const buildingId = getBuildingId(req);
        if (!isID(buildingId)) {
            throw new BadRequestError({ message: `Invalid buildingId '${buildingId}'` });
        }

        await checkUserBuilding(req.state.user, { buildingId });
    });

const checkModelPermission = (getModelId) =>
    wrap(async (req) => {
        const modelId = getModelId(req);
        if (!isID(modelId)) {
            throw new BadRequestError({ message: `Invalid modelId '${modelId}'` });
        }

        const model = await modelService.findOneBuildingId({ modelId });
        if (!model) {
            throw new NotFoundError();
        }

        await checkUserBuilding(req.state.user, model);
    });

const checkUnitPermission = (getUnitId) =>
    wrap(async (req) => {
        const unitId = getUnitId(req);
        if (!isID(unitId)) {
            throw new BadRequestError({ message: `Invalid unitId '${unitId}'` });
        }

        const unit = await unitsService.findOneBuildingId({ unitId });
        if (!unit) {
            throw new NotFoundError();
        }

        await checkUserBuilding(req.state.user, unit);
    });

const checkUnitsPermission = (getUnitIds) =>
    wrap(async (req) => {
        const unitIds = getUnitIds(req);
        if (!Array.isArray(unitIds) || !unitIds.every((unitId) => isID(unitId))) {
            throw new BadRequestError({ message: `Invalid unitIds '${unitIds}'` });
        }

        const units = await unitsService.findAllBuildingIds({ unitIds });
        if (units.length === 0) {
            throw new NotFoundError();
        }

        await checkUserBuildings(req.state.user, {
            buildingIds: units.map(({ buildingId }) => buildingId),
        });
    });

const checkDescriptionPermission = (getDescriptionId) =>
    wrap(async (req) => {
        const descriptionId = getDescriptionId(req);
        if (!isID(descriptionId)) {
            throw new BadRequestError({ message: `Invalid descriptionId '${descriptionId}'` });
        }

        const description = await descriptionService.findOneBuildingId({ descriptionId });
        if (!description) {
            throw new NotFoundError();
        }

        await checkUserBuilding(req.state.user, description);
    });

const checkPalettePermission = (getPaletteId) =>
    wrap(async (req) => {
        const paletteId = getPaletteId(req);
        if (!isID(paletteId)) {
            throw new BadRequestError({ message: `Invalid paletteId '${paletteId}'` });
        }

        const palette = await paletteService.findOneBuildingId({ paletteId });
        if (!palette) {
            throw new NotFoundError();
        }

        await checkUserBuilding(req.state.user, palette);
    });

const checkPaletteLocationPermission = (getPaletteLocationId) =>
    wrap(async (req) => {
        const paletteLocationId = getPaletteLocationId(req);
        if (!isID(paletteLocationId)) {
            throw new BadRequestError({
                message: `Invalid paletteLocationId '${paletteLocationId}'`,
            });
        }

        const paletteLocation = await paletteLocationService.findOneBuildingId({
            paletteLocationId,
        });

        if (!paletteLocation) {
            throw new NotFoundError();
        }

        await checkUserBuilding(req.state.user, paletteLocation);
    });

const checkOptionPermission = (getOptionsId) =>
    wrap(async (req) => {
        const optionsId = getOptionsId(req);
        if (!isID(optionsId)) {
            throw new BadRequestError({ message: `Invalid optionsId '${optionsId}'` });
        }

        const option = await optionsService.findOneBuildingId({ optionsId });
        if (!option) {
            throw new NotFoundError();
        }

        await checkUserBuilding(req.state.user, option);
    });

const checkFinishTypePermission = (getFinishTypeId) =>
    wrap(async (req) => {
        const finishTypeId = getFinishTypeId(req);
        if (!isID(finishTypeId)) {
            throw new BadRequestError({ message: `Invalid finishTypeId '${finishTypeId}'` });
        }

        const finishType = await finishTypeService.findOneByFinishTypeId({ finishTypeId });
        if (!finishType) {
            throw new NotFoundError();
        }

        await checkUserBuilding(req.state.user, finishType);
    });

const checkPricePermission = (getPriceId) =>
    wrap(async (req) => {
        const priceId = getPriceId(req);
        if (!isID(priceId)) {
            throw new BadRequestError({ message: `Invalid priceId '${priceId}'` });
        }

        const price = await pricesService.findOneByPriceId({ priceId });
        if (!price) {
            throw new NotFoundError();
        }

        await checkUserBuilding(req.state.user, price);
    });

const checkOwnerPermission = (getUnitId, getUserId) =>
    wrap(async (req) => {
        const unitId = getUnitId(req);
        if (!isID(unitId)) {
            throw new BadRequestError({ message: `Invalid unitId '${unitId}'` });
        }

        const userId = getUserId(req);
        if (!isID(userId)) {
            throw new BadRequestError({ message: `Invalid userId '${userId}'` });
        }

        const unitUser = await unitsUsersService.findOne({ unitId, userId });
        if (!unitUser) {
            throw new NotFoundError();
        }

        const unit = await unitsService.findOneBuildingId({ unitId });
        if (!unit) {
            throw new NotFoundError();
        }

        await checkUserBuilding(req.state.user, unit);
    });

module.exports = {
    provideUserBuildingIds,
    checkBuildingPermission,
    checkModelPermission,
    checkUnitPermission,
    checkUnitsPermission,
    checkDescriptionPermission,
    checkPalettePermission,
    checkPaletteLocationPermission,
    checkOptionPermission,
    checkFinishTypePermission,
    checkPricePermission,
    checkOwnerPermission,
};
