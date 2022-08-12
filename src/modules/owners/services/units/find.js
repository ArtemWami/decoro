const {Units, User, Buildings, BuildingImage, Model, ModelImage, Description} = require('../../../../../models');

const findOneOnlyWithUser = ({ unitId, userId }) =>
    Units.findOne({
        attributes: ['unitId', 'companyId'],
        where: {unitId},
        include: [
            {
                model: User,
                where: {userId},
                through: {attributes: []},
                required: true,
                as: 'users',
                attributes: [],
            },
        ]
    });

const findAll = ({limit, offset, companyId, subdomainId, userId}) =>
    Units.findAll({
        limit,
        offset,
        attributes: ['unitId', 'unitNumber', 'type'],
        where: {
            companyId,
            subdomainId
        },
        include: [
            {
                model: User,
                where: {userId},
                through: {attributes: []},
                required: true,
                as: 'users',
                attributes: [],
            },
            {
                model: Buildings,
                as: 'building',
                required: false,
                attributes: ['buildingId', 'name', 'address', 'city', 'province', 'postalCode'],
                include: [
                    {
                        model: BuildingImage,
                        as: 'images',
                        required: false,
                        order: [['image_id', 'DESC']],
                        attributes: ['location']
                    }
                ]
            }
        ]
    });

const findOne = ({unitId}) =>
    Units.findOne({
        attributes: ['unitId', 'cash'],
        where: {
            unitId
        },
        include: [
            {
                model: Buildings,
                as: 'building',
                required: false,
                attributes: ['name']
            },
            {
                model: Model,
                as: 'model',
                required: false,
                attributes: ['modelId'],
                include: [
                    {
                        model: ModelImage,
                        as: 'images',
                        required: false,
                        order: [['imageId', 'DESC']],
                        attributes: ['imageId', 'type']
                    }
                ]
            },
            {
                model: Description,
                as: 'description',
                required: false,
                attributes: ['descriptionId', 'text']
            }
        ]
    });


module.exports = {findAll, findOne, findOneOnlyWithUser};
