module.exports = (sequelize, DataTypes) => {
    const Model = sequelize.define(
        'Model',
        {
            modelId: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                primaryKey: true,
                allowNull: false,
                field: 'model_id',
            },
            name: {
                type: DataTypes.TEXT,
                allowNull: false,
                field: 'name',
                validate: { len: [0, 255] },
            },
            bedrooms: {
                type: DataTypes.INTEGER,
                allowNull: true,
                field: 'bedrooms',
            },
            den: {
                type: DataTypes.BOOLEAN,
                allowNull: false,
                defaultValue: false,
                field: 'den',
            },
            bathrooms: {
                type: DataTypes.INTEGER,
                allowNull: true,
                field: 'bathrooms',
            },
            interiorSqFt: {
                type: DataTypes.FLOAT,
                allowNull: true,
                field: 'interior_sq_ft',
            },
            exteriorSqFt: {
                type: DataTypes.FLOAT,
                allowNull: true,
                field: 'exterior_sq_ft',
            },
            buildingId: {
                type: DataTypes.UUID,
                allowNull: false,
                field: 'building_id',
            },
            companyId: {
                type: DataTypes.UUID,
                allowNull: false,
                field: 'company_id',
            },
            subdomainId: {
                type: DataTypes.UUID,
                allowNull: false,
                field: 'subdomain_id',
            },
            createdBy: {
                type: DataTypes.UUID,
                allowNull: true,
                field: 'created_by',
            },
            updatedBy: {
                type: DataTypes.UUID,
                allowNull: true,
                field: 'updated_by',
            },
            createdAt: {
                type: DataTypes.DATE,
                allowNull: false,
                field: 'created_at',
            },
            updatedAt: {
                type: DataTypes.DATE,
                allowNull: false,
                field: 'updated_at',
            },
            deletedAt: {
                type: DataTypes.DATE,
                allowNull: true,
                field: 'deleted_at',
            },
        },
        {
            tableName: 'models',
            paranoid: true,
            timestamps: true,
            freezeTableName: true,
        }
    );

    Model.attributes = {
        base: [
            'modelId',
            'name',
            'interiorSqFt',
            'exteriorSqFt',
            'buildingId',
            'bedrooms',
            'den',
            'bathrooms',
        ],
    };

    Model.include = {
        base: (include = []) => {
            return {
                model: Model,
                as: 'model',
                required: false,
                attributes: Model.attributes.base,
                include,
            };
        },
    };

    Model.associate = ({ Room, ModelRoom, ModelImage, Units }) => {
        Model.hasMany(ModelImage, { foreignKey: 'modelId', sourceKey: 'modelId', as: 'images' });
        Model.hasMany(Units, { foreignKey: 'modelId', sourceKey: 'modelId', as: 'units' });
        Model.belongsToMany(Room, {
            through: ModelRoom,
            foreignKey: 'modelId',
            otherKey: 'roomId',
            as: 'rooms',
        });

        Model.addScope('withRooms', {
            include: [
                {
                    model: Room,
                    through: { attributes: [] },
                    as: 'rooms',
                    attributes: Room.attributes.base,
                    order: [['order_id', 'asc']],
                },
            ],
        });

        Model.addScope('withImages', {
            include: [
                {
                    model: ModelImage,
                    as: 'images',
                    attributes: ModelImage.attributes.base,
                    order: [['imageId', 'DESC']],
                },
            ],
        });
    };

    return Model;
};
