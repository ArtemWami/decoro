const {
    Buildings,
    Op,
    Model,
    Room,
    Options,
    FinishType,
} = require('../../../models');

const findBuilding = {
    all: {
        byCompanyId: ({
            companyId,
            buildingId,
            limit,
            offset,
            attributes = Buildings.attributes.base,
        }) =>
            Buildings.scope(['withImages', 'withUser']).findAll({
                limit,
                offset,
                attributes,
                where: { companyId, ...(buildingId && { buildingId }) },
                order: [['createdAt', 'ASC']],
            }),
        searchInCompany: ({
            companyId,
            buildingId,
            limit,
            offset,
            search,
            attributes = Buildings.attributes.base,
        }) => {
            const iLikeSearch = { [Op.iLike]: `%${search}%` };
            return Buildings.scope(['withImages', 'withUser']).findAll({
                limit,
                offset,
                attributes,
                where: {
                    companyId,
                    ...(buildingId && { buildingId }),
                    [Op.or]: [
                        { name: iLikeSearch },
                        { address: iLikeSearch },
                        { city: iLikeSearch },
                        { province: iLikeSearch },
                        { postalCode: iLikeSearch },
                    ],
                },
                order: [['createdAt', 'ASC']],
            });
        },
    },
    one: {
        byBuildingId: ({ buildingId, attributes = Buildings.attributes.base }) =>
            Buildings.scope(['withImages', 'withUser']).findOne({ where: { buildingId }, attributes }),
        findOneWithModels: ({ buildingId, name, attributes = ['buildingId', 'name'] }) =>
            Buildings.findOne({
                attributes,
                where: { buildingId },
                include: [
                    {
                        model: Model.scope(['withImages']),
                        where: { [Op.or]: [{ name: { [Op.iLike]: `%${name}%` } }] },
                        as: 'models',
                        required: false,
                        attributes: Model.attributes.base,
                    },
                ],
                order: [
                    ['models', 'name', 'ASC'],
                    ['models', 'created_at', 'DESC'],
                ],
            }),
        findOneWithRooms: ({ buildingId, attributes = ['buildingId', 'name'] }) =>
            Buildings.findOne({
                attributes,
                where: { buildingId },
                include: [
                    {
                        model: Room,
                        through: { attributes: [] },
                        as: 'rooms',
                        attributes: ['roomId', 'name', 'parentId'],
                        include: [
                            {
                                model: Options,
                                as: 'options',
                                attributes: ['optionsId', 'name'],
                                separate: true,
                                where: { buildingId },
                                include: [
                                    {
                                        model: FinishType,
                                        as: 'finishTypes',
                                        attributes: ['finishTypeId', 'name'],
                                    },
                                ],
                                order: [['createdAt', 'DESC']],
                            },
                            {
                                model: Room,
                                as: 'parent',
                                attributes: ['roomId', 'name'],
                            },
                        ],
                    },
                ],
                order: [['rooms', 'order_id', 'ASC']],
            }),
        byIdWithUsers: ({ buildingId, attributes = Buildings.attributes.base }) =>
            Buildings.scope(['withUser']).findOne({ where: { buildingId }, attributes }),
    },
};

const countBuildingById = ({ buildingId }) => Buildings.count({ where: { buildingId } });

module.exports = {
    findBuilding,
    countBuildingById
};
