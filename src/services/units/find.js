const {
    Units,
    Buildings,
    User,
    Description,
    Model,
    Op,
    sequelize,
} = require('../../../models');

const includeUsers = {
    model: User,
    through: { attributes: [] },
    attributes: User.attributes.base,
    as: 'users',
};

const findUnits = {
    all: {
        list: () => Units.findAll({ attributes: Units.attributes.base }),
        listOfBuilding: ({ buildingId, limit, offset }) =>
            Units.findAll({
                where: { buildingId },
                limit,
                offset,
                attributes: Units.attributes.base,
                include: [Buildings.include.base(), includeUsers, Model.include.base()],
            }),

        searchInlistOfBuilding: ({ buildingId, limit, offset, search }) => {
            const searchObj = {};
            if (search) {
                const iLikeSearch = { [Op.iLike]: `%${search}%` };
                searchObj[Op.or] = [
                    sequelize.where(
                        sequelize.cast(sequelize.col('unit_number'), 'varchar'),
                        iLikeSearch
                    ),
                    sequelize.where(sequelize.col('"Units"."type"'), iLikeSearch),
                    sequelize.where(sequelize.col('"users"."phone"'), iLikeSearch),
                    sequelize.where(sequelize.col('"users"."first_name"'), iLikeSearch),
                    sequelize.where(sequelize.col('"users"."last_name"'), iLikeSearch),
                    sequelize.where(sequelize.col('"model"."name"'), iLikeSearch),
                ];
            }

            return Units.findAndCountAll({
                limit,
                offset,
                subQuery: false,
                where: { [Op.and]: [{ buildingId }, searchObj] },
                attributes: Units.attributes.base,
                include: [Buildings.include.base(), includeUsers, Model.include.base()],
                order: [
                    ['type', 'ASC'],
                    ['unitNumber', 'ASC'],
                ],
            });
        },
    },
    one: {
        byUnitId: ({ unitId }) =>
            Units.findOne({
                where: { unitId },
                attributes: Units.attributes.base,
                include: [
                    Buildings.include.base(),
                    includeUsers,
                    Description.include.base(),
                    Model.include.base(),
                ],
            }),
        byUnitAndBuildingId: ({ unitNumber, buildingId }) =>
            Units.findOne({
                where: { unitNumber, buildingId },
                attributes: Units.attributes.base,
            }),
        byUnitNumberAndType: ({ unitNumber, type, buildingId }) =>
            Units.findOne({
                where: { unitNumber, type, buildingId },
                attributes: Units.attributes.base,
            }),
    },
};

module.exports = {
    findUnits,
};
