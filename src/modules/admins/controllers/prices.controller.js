const httpStatusCodes = require('http-status-codes');
const finishTypeService = require('../../../services/finishType');
const modelService = require('../../../services/model');
const pricesService = require('../../../services/prices');
const priceModelsService = require('../../../services/priceModels');
const priceUnitTypesService = require('../../../services/priceUnitTypes');
const { sequelize } = require('../../../../models');
const { NotFoundError, BadRequestError } = require('../../../errors');

const create = async (req, res) => {
    const {
        finishTypeId,
        contractorPrice,
        lowerLevelUnitsPrice,
        lowerPenthousesPrice,
        upperPenthousesPrice,
        townhousesPrice,
        modelIds,
        unitTypes,
    } = req.body;

    const { userId } = req.state.user;
    const { companyId } = req.state.company;
    const finishType = await finishTypeService.findOneByFinishTypeId({ finishTypeId, companyId });
    if (!finishType) {
        throw new NotFoundError({ message: 'Finish type not found' });
    }

    const models = await modelService.findAllByModelIds({
        modelIds,
        buildingId: finishType.buildingId,
    });

    if (models.length !== modelIds.length) {
        throw new BadRequestError({ message: 'modelIds are invalid' });
    }

    const { subdomainId } = req.state.subdomain;
    const transaction = await sequelize.transaction();
    let price;
    try {
        price = await pricesService.create(
            {
                companyId,
                subdomainId,
                contractorPrice,
                lowerLevelUnitsPrice,
                lowerPenthousesPrice,
                upperPenthousesPrice,
                townhousesPrice,
                finishTypeId: finishType.finishTypeId,
                buildingId: finishType.buildingId,
                createdBy: userId,
            },
            { transaction }
        );

        if (models.length > 0) {
            const data = models.map(({ modelId }) => ({
                modelId,
                companyId,
                subdomainId,
                priceId: price.priceId,
                buildingId: price.buildingId,
                createdBy: userId,
            }));

            await priceModelsService.bulkCreate(data, { transaction });
        }

        if (unitTypes.length > 0) {
            const data = unitTypes.map((unitType) => ({
                unitType,
                companyId,
                subdomainId,
                priceId: price.priceId,
                buildingId: price.buildingId,
                createdBy: userId,
            }));

            await priceUnitTypesService.bulkCreate(data, { transaction });
        }

        await transaction.commit();
    } catch (err) {
        await transaction.rollback();
        throw err;
    }

    // query updated price type with price models and price unit types
    price = await pricesService.findOneByPriceId({ priceId: price.priceId });
    res.json(price);
};

const update = async (req, res) => {
    const { priceId } = req.params;
    const {
        contractorPrice,
        lowerLevelUnitsPrice,
        lowerPenthousesPrice,
        upperPenthousesPrice,
        townhousesPrice,
        modelIds,
        unitTypes,
    } = req.body;

    const { userId } = req.state.user;
    const { companyId } = req.state.company;
    let price = await pricesService.findOneByPriceId({ priceId, companyId });
    if (!price) {
        throw new NotFoundError({ message: 'Price not found' });
    }

    const models = await modelService.findAllByModelIds({
        modelIds,
        buildingId: price.buildingId,
    });

    if (models.length !== modelIds.length) {
        throw new BadRequestError({ message: 'modelIds are invalid' });
    }

    const transaction = await sequelize.transaction();
    try {
        await pricesService.updateByPriceId(
            priceId,
            {
                contractorPrice,
                lowerLevelUnitsPrice,
                lowerPenthousesPrice,
                upperPenthousesPrice,
                townhousesPrice,
                updatedBy: userId,
            },
            { transaction }
        );

        const { subdomainId } = req.state.subdomain;
        const priceModelData = models.map(({ modelId }) => ({
            modelId,
            companyId,
            subdomainId,
            priceId: price.priceId,
            buildingId: price.buildingId,
            createdBy: userId,
        }));

        await priceModelsService.bulkUpdateByPriceId(priceId, price.priceModels, priceModelData, {
            transaction,
        });

        const priceUnitTypeData = unitTypes.map((unitType) => ({
            unitType,
            companyId,
            subdomainId,
            priceId: price.priceId,
            buildingId: price.buildingId,
            createdBy: userId,
        }));

        await priceUnitTypesService.bulkUpdateByPriceId(
            priceId,
            price.priceUnitTypes,
            priceUnitTypeData,
            { transaction }
        );

        await transaction.commit();
    } catch (err) {
        await transaction.rollback();
        throw err;
    }

    // query updated price type with price models and price unit types
    price = await pricesService.findOneByPriceId({ priceId: price.priceId });
    res.json(price);
};

const destroy = async (req, res) => {
    const { priceId } = req.params;
    const { companyId } = req.state.company;
    await pricesService.destroyByPriceId({ priceId, companyId });
    res.sendStatus(httpStatusCodes.NO_CONTENT);
};

module.exports = {
    create,
    update,
    destroy,
};
