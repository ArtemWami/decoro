const httpStatusCodes = require('http-status-codes');
const optionsService = require('../../../services/options');
const paletteService = require('../../../services/palette');
const finishTypeService = require('../../../services/finishType');
const finishTypePaletteService = require('../../../services/finishTypePalette');
const { sequelize } = require('../../../../models');
const { NotFoundError, BadRequestError } = require('../../../errors');

const create = async (req, res) => {
    const { optionsId, name, description, paletteIds } = req.body;
    const { userId } = req.state.user;
    const option = await optionsService.findOneByOptionsId({ optionsId });
    if (!option) {
        throw new NotFoundError({ message: 'Option not found' });
    }

    const palettes = await paletteService.findAllByPaletteIds({
        paletteIds,
        buildingId: option.buildingId,
    });

    if (palettes.length !== paletteIds.length) {
        throw new BadRequestError({ message: 'paletteIds are invalid' });
    }

    const { companyId } = req.state.company;
    const { subdomainId } = req.state.subdomain;
    const transaction = await sequelize.transaction();
    let finishType;
    try {
        finishType = await finishTypeService.create(
            {
                companyId,
                subdomainId,
                name,
                description,
                optionsId: option.optionsId,
                buildingId: option.buildingId,
                createdBy: userId,
            },
            { transaction }
        );

        const data = palettes.map(({ paletteId }) => ({
            paletteId,
            companyId,
            subdomainId,
            finishTypeId: finishType.finishTypeId,
            buildingId: finishType.buildingId,
            createdBy: userId,
        }));

        await finishTypePaletteService.bulkCreate(data, { transaction });
        await transaction.commit();
    } catch (err) {
        await transaction.rollback();
        throw err;
    }

    // query updated finish type with finish type palettes
    finishType = await finishTypeService.findOneByFinishTypeId({
        finishTypeId: finishType.finishTypeId,
    });

    res.json(finishType);
};

const update = async (req, res) => {
    const { finishTypeId } = req.params;
    const { name, description, paletteIds } = req.body;
    const { userId } = req.state.user;
    const { companyId } = req.state.company;
    let finishType = await finishTypeService.findOneByFinishTypeId({ finishTypeId, companyId });
    if (!finishType) {
        throw new NotFoundError({ message: 'Finish type not found' });
    }

    const palettes = await paletteService.findAllByPaletteIds({
        paletteIds,
        buildingId: finishType.buildingId,
    });

    if (palettes.length !== paletteIds.length) {
        throw new BadRequestError({ message: 'paletteIds are invalid' });
    }

    const transaction = await sequelize.transaction();
    try {
        await finishTypeService.updateByFinishTypeId(
            finishTypeId,
            { name, description, updatedBy: userId },
            { transaction }
        );

        const { subdomainId } = req.state.subdomain;
        const data = palettes.map(({ paletteId }) => ({
            paletteId,
            companyId,
            subdomainId,
            finishTypeId: finishType.finishTypeId,
            buildingId: finishType.buildingId,
            createdBy: userId,
        }));

        await finishTypePaletteService.bulkUpdateByFinishTypeId(
            finishTypeId,
            finishType.finishTypePalettes,
            data,
            { transaction }
        );

        await transaction.commit();
    } catch (err) {
        await transaction.rollback();
        throw err;
    }

    // query updated finish type with finish type palettes
    finishType = await finishTypeService.findOneByFinishTypeId({
        finishTypeId: finishType.finishTypeId,
    });

    res.json(finishType);
};

const destroy = async (req, res) => {
    const { finishTypeId } = req.params;
    const { companyId } = req.state.company;
    await finishTypeService.destroyByFinishTypeId({ finishTypeId, companyId });
    res.sendStatus(httpStatusCodes.NO_CONTENT);
};

module.exports = {
    create,
    update,
    destroy,
};
