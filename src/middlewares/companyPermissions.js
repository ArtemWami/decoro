const buildingsService = require('../services/buildings');
const modelService = require('../services/model');
const unitsService = require('../services/units');
const descriptionService = require('../services/description');
const paletteService = require('../services/palette');
const paletteLocationService = require('../services/paletteLocation');
const optionsService = require('../services/options');
const finishTypeService = require('../services/finishType');
const pricesService = require('../services/prices');
const userService = require('../services/user');
const { ForbiddenError, NotFoundError, BadRequestError } = require('../errors');
const { wrap } = require('../base/middleware');
const { isID } = require('../helpers/middleware');

const checkUserCompany = (user, { companyId }) => {
    if (user.companyId !== companyId) {
        throw new ForbiddenError();
    }
};

const checkCompanyPermission = (getCompanyId) =>
    wrap(async (req) => {
        const companyId = getCompanyId(req);
        if (!isID(companyId)) {
            throw new BadRequestError({ message: `Invalid companyId '${companyId}'` });
        }

        checkUserCompany(req.state.user, { companyId });
    });

const checkBuildingPermission = (getBuildingId) =>
    wrap(async (req) => {
        const buildingId = getBuildingId(req);
        if (!isID(buildingId)) {
            throw new BadRequestError({ message: `Invalid buildingId '${buildingId}'` });
        }

        const building = await buildingsService.findOneCompanyId({ buildingId });
        if (!building) {
            throw new NotFoundError();
        }

        checkUserCompany(req.state.user, building);
    });

const checkModelPermission = (getModelId) =>
    wrap(async (req) => {
        const modelId = getModelId(req);
        if (!isID(modelId)) {
            throw new BadRequestError({ message: `Invalid modelId '${modelId}'` });
        }

        const model = await modelService.findOneCompanyId({ modelId });
        if (!model) {
            throw new NotFoundError();
        }

        checkUserCompany(req.state.user, model);
    });

const checkUnitPermission = (getUnitId) =>
    wrap(async (req) => {
        const unitId = getUnitId(req);
        if (!isID(unitId)) {
            throw new BadRequestError({ message: `Invalid unitId '${unitId}'` });
        }

        const unit = await unitsService.findOneCompanyId({ unitId });
        if (!unit) {
            throw new NotFoundError();
        }

        checkUserCompany(req.state.user, unit);
    });

const checkUnitsPermission = (getUnitIds) =>
    wrap(async (req) => {
        const unitIds = getUnitIds(req);
        if (!Array.isArray(unitIds) || !unitIds.every((unitId) => isID(unitId))) {
            throw new BadRequestError({ message: `Invalid unitIds '${unitIds}'` });
        }

        const units = await unitsService.findAllCompanyIds({ unitIds });
        if (units.length === 0) {
            throw new NotFoundError();
        }

        units.forEach((unit) => {
            checkUserCompany(req.state.user, unit);
        });
    });

const checkDescriptionPermission = (getDescriptionId) =>
    wrap(async (req) => {
        const descriptionId = getDescriptionId(req);
        if (!isID(descriptionId)) {
            throw new BadRequestError({ message: `Invalid descriptionId '${descriptionId}'` });
        }

        const description = await descriptionService.findOneCompanyId({ descriptionId });
        if (!description) {
            throw new NotFoundError();
        }

        checkUserCompany(req.state.user, description);
    });

const checkPalettePermission = (getPaletteId) =>
    wrap(async (req) => {
        const paletteId = getPaletteId(req);
        if (!isID(paletteId)) {
            throw new BadRequestError({ message: `Invalid paletteId '${paletteId}'` });
        }

        const palette = await paletteService.findOneCompanyId({ paletteId });
        if (!palette) {
            throw new NotFoundError();
        }

        checkUserCompany(req.state.user, palette);
    });

const checkPaletteLocationPermission = (getPaletteLocationId) =>
    wrap(async (req) => {
        const paletteLocationId = getPaletteLocationId(req);
        if (!isID(paletteLocationId)) {
            throw new BadRequestError({
                message: `Invalid paletteLocationId '${paletteLocationId}'`,
            });
        }

        const paletteLocation = await paletteLocationService.findOneCompanyId({
            paletteLocationId,
        });
        if (!paletteLocation) {
            throw new NotFoundError();
        }

        checkUserCompany(req.state.user, paletteLocation);
    });

const checkOptionPermission = (getOptionsId) =>
    wrap(async (req) => {
        const optionsId = getOptionsId(req);
        if (!isID(optionsId)) {
            throw new BadRequestError({ message: `Invalid optionsId '${optionsId}'` });
        }

        const option = await optionsService.findOneCompanyId({ optionsId });
        if (!option) {
            throw new NotFoundError();
        }

        checkUserCompany(req.state.user, option);
    });

const checkFinishTypePermission = (getFinishTypeId) =>
    wrap(async (req) => {
        const finishTypeId = getFinishTypeId(req);
        if (!isID(finishTypeId)) {
            throw new BadRequestError({ message: `Invalid finishTypeId '${finishTypeId}'` });
        }

        const finishType = await finishTypeService.findOneCompanyId({ finishTypeId });
        if (!finishType) {
            throw new NotFoundError();
        }

        checkUserCompany(req.state.user, finishType);
    });

const checkPricePermission = (getPriceId) =>
    wrap(async (req) => {
        const priceId = getPriceId(req);
        if (!isID(priceId)) {
            throw new BadRequestError({ message: `Invalid priceId '${priceId}'` });
        }

        const price = await pricesService.findOneCompanyId({ priceId });
        if (!price) {
            throw new NotFoundError();
        }

        checkUserCompany(req.state.user, price);
    });

const checkUserPermission = (getUserId) =>
    wrap(async (req) => {
        const userId = getUserId(req);
        if (!isID(userId)) {
            throw new BadRequestError({ message: `Invalid userId '${userId}'` });
        }

        const user = await userService.findOneCompanyId({ userId });
        if (!user) {
            throw new NotFoundError();
        }

        checkUserCompany(req.state.user, user);
    });

const checkUsersPermission = (getUserIds) =>
    wrap(async (req) => {
        const userIds = getUserIds(req);
        if (!Array.isArray(userIds) || !userIds.every((userId) => isID(userId))) {
            throw new BadRequestError({ message: `Invalid userIds '${userIds}'` });
        }

        // users are empty in case of unassign
        if (userIds.length === 0) {
            return;
        }

        const users = await userService.findAllCompanyIds({ userIds });
        if (users.length === 0) {
            throw new NotFoundError();
        }

        users.forEach((user) => {
            checkUserCompany(req.state.user, user);
        });
    });

module.exports = {
    checkCompanyPermission,
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
    checkUserPermission,
    checkUsersPermission,
};
