const {
    Options,
    FinishType,
    FinishTypePalette,
    Palette,
    Price,
    PriceUnitType,
    Model,
    FinishTypePaletteImage,
    sequelize,
} = require('../../../models');

const findOptions = {
    all: {
        list: () => Options.findAll(),
        listByBuildAndRoomId: ({ buildingId, roomId }) =>
            Options.findAll({
                where: { buildingId, roomId },
                attributes: ['optionsId', 'name', 'buildingId', 'roomId'],
                include: [
                    {
                        model: FinishType,
                        as: 'finishTypes',
                        attributes: ['finishTypeId', 'optionsId', 'name', 'description'],
                        include: [
                            {
                                model: FinishTypePalette,
                                as: 'finishTypePalettes',
                                attributes: ['finishTypeId', 'paletteId'],
                                include: [
                                    {
                                        model: Palette,
                                        as: 'palette',
                                        attributes: ['paletteId', 'name'],
                                    },
                                    {
                                        model: FinishTypePaletteImage,
                                        as: 'images',
                                        attributes: ['imageId', 'location'],
                                    },
                                ],
                            },
                            {
                                model: Price,
                                as: 'prices',
                                attributes: [
                                    'priceId',
                                    'contractorPrice',
                                    'lowerLevelUnitsPrice',
                                    'lowerPenthousesPrice',
                                    'upperPenthousesPrice',
                                    'townhousesPrice',
                                ],
                                include: [
                                    {
                                        model: Model,
                                        as: 'models',
                                        through: { attributes: [] },
                                        attributes: ['modelId', 'name'],
                                    },
                                    {
                                        model: PriceUnitType,
                                        as: 'priceUnitTypes',
                                        attributes: ['priceId', 'unitType'],
                                    },
                                ],
                            },
                        ],
                    },
                ],
                order: [
                    ['createdAt', 'DESC'],
                    ['finishTypes', 'createdAt', 'DESC'],
                    [sequelize.col('finishTypes->finishTypePalettes.created_at'), 'DESC'],
                    [sequelize.col('finishTypes->prices.created_at'), 'DESC'],
                    [sequelize.col('finishTypes->prices->models.created_at'), 'DESC'],
                ],
            }),
    },
    one: {
        byOptionsId: ({ optionsId, attributes = Options.attributes.base }) =>
            Options.findOne({ where: { optionsId }, attributes }),
    },
};

const countBuildingById = ({ buildingId, roomId }) =>
    Options.count({ where: { buildingId, roomId } });

const countOptionDuplicate = ({ buildingId, roomId, name }) =>
    Options.count({ where: { buildingId, roomId, name } });

module.exports = { findOptions, countBuildingById, countOptionDuplicate };
